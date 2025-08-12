import {
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

export class WhatsAppMultiSessionTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WhatsApp Multi-Session Trigger',
		name: 'whatsAppMultiSessionTrigger',
		icon: 'file:whatsapp.svg',
		group: ['trigger'],
		version: 1,
		subtitle: 'Receive WhatsApp messages',
		description: 'Receive incoming WhatsApp messages via webhook',
		defaults: {
			name: 'WhatsApp Multi-Session Trigger',
		},
		inputs: [],
		outputs: [{ displayName: '', type: NodeConnectionType.Main }],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Session ID Filter',
				name: 'sessionIdFilter',
				type: 'string',
				default: '',
				placeholder: 'session_123',
				description: 'Only trigger for specific session ID (leave empty for all sessions)',
			},
			{
				displayName: 'Message Type Filter',
				name: 'messageTypeFilter',
				type: 'options',
				options: [
					{
						name: 'All Messages',
						value: 'all',
					},
					{
						name: 'Text Messages Only',
						value: 'text',
					},
					{
						name: 'Media Messages Only',
						value: 'media',
					},
					{
						name: 'Status Updates Only',
						value: 'status',
					},
				],
				default: 'all',
				description: 'Filter messages by type',
			},
			{
				displayName: 'Include System Messages',
				name: 'includeSystemMessages',
				type: 'boolean',
				default: false,
				description: 'Whether to include system messages (user joined, left group, etc.)',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const sessionIdFilter = this.getNodeParameter('sessionIdFilter') as string;
		const messageTypeFilter = this.getNodeParameter('messageTypeFilter') as string;
		const includeSystemMessages = this.getNodeParameter('includeSystemMessages') as boolean;

		// Filter by session ID if specified
		if (sessionIdFilter && bodyData.session_id !== sessionIdFilter) {
			return {
				noWebhookResponse: true,
			};
		}

		// Filter by message type
		if (messageTypeFilter !== 'all') {
			const messageType = bodyData.message_type as string;
			
			if (messageTypeFilter === 'text' && messageType !== 'text') {
				return { noWebhookResponse: true };
			}
			
			if (messageTypeFilter === 'media' && !['image', 'video', 'audio', 'document'].includes(messageType)) {
				return { noWebhookResponse: true };
			}
			
			if (messageTypeFilter === 'status' && messageType !== 'status') {
				return { noWebhookResponse: true };
			}
		}

		// Filter system messages
		if (!includeSystemMessages && bodyData.is_system_message === true) {
			return {
				noWebhookResponse: true,
			};
		}

		// Extract phone number from WhatsApp ID format (e.g., "6281381393739:36@s.whatsapp.net" -> "6281381393739")
		const extractPhoneNumber = (whatsappId: string): string => {
			if (typeof whatsappId === 'string' && whatsappId.includes('@')) {
				return whatsappId.split(':')[0] || whatsappId.split('@')[0];
			}
			return whatsappId;
		};

		// Structure the webhook data for n8n based on your actual webhook format
		const webhookData: IDataObject = {
			// Message details (matching your webhook structure)
			id: bodyData.id,
			session_id: bodyData.session_id,
			from: bodyData.from,
			from_phone: extractPhoneNumber(bodyData.from as string),
			from_name: bodyData.from_name,
			to: bodyData.to,
			to_phone: extractPhoneNumber(bodyData.to as string),
			message_type: bodyData.message_type,
			timestamp: bodyData.timestamp,
			is_group: bodyData.is_group || false,
			
			// Message content
			message: bodyData.message,
			text: bodyData.message, // Alias for convenience
			caption: bodyData.caption,
			
			// Contact info (structured)
			contact: {
				phone: extractPhoneNumber(bodyData.from as string),
				name: bodyData.from_name,
				whatsapp_id: bodyData.from,
			},
			
			// Group info (if applicable)
			group: bodyData.is_group ? {
				id: bodyData.group_id,
				name: bodyData.group_name,
				participants: bodyData.group_participants,
			} : null,
			
			// Media info (if applicable)  
			media: bodyData.media_url || bodyData.media_id || bodyData.file_url ? {
				url: bodyData.media_url || bodyData.file_url,
				media_id: bodyData.media_id,
				mime_type: bodyData.mime_type,
				file_size: bodyData.file_size,
				filename: bodyData.filename,
			} : null,
			
			// Location info (if applicable)
			location: bodyData.latitude && bodyData.longitude ? {
				latitude: bodyData.latitude,
				longitude: bodyData.longitude,
				name: bodyData.location_name,
				address: bodyData.location_address,
			} : null,
			
			// System message info
			is_system_message: bodyData.is_system_message || false,
			system_message_type: bodyData.system_message_type,
			
			// Reply info (if applicable)
			reply_to: bodyData.reply_to_message_id ? {
				message_id: bodyData.reply_to_message_id,
				message: bodyData.reply_to_message,
			} : null,
			
			// Raw webhook data for advanced use
			raw: bodyData,
		};

		return {
			workflowData: [
				[
					{
						json: webhookData,
					},
				],
			],
		};
	}
}