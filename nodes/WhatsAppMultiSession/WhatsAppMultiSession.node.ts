import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	IBinaryData,
} from 'n8n-workflow';

export class WhatsAppMultiSession implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WhatsApp Multi-Session',
		name: 'whatsAppMultiSession',
		icon: 'file:whatsapp.svg',
		group: ['communication'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with WhatsApp Multi-Session API',
		defaults: {
			name: 'WhatsApp Multi-Session',
		},
		inputs: [{ displayName: '', type: NodeConnectionType.Main }],
		outputs: [{ displayName: '', type: NodeConnectionType.Main }],
		credentials: [
			{
				name: 'whatsAppMultiSessionApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Session',
						value: 'session',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Typing',
						value: 'typing',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'message',
			},

			// Session Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['session'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new WhatsApp session',
						action: 'Create a session',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get session information',
						action: 'Get a session',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all sessions',
						action: 'List sessions',
					},
					{
						name: 'Connect',
						value: 'connect',
						description: 'Connect a session (get QR code)',
						action: 'Connect a session',
					},
					{
						name: 'Disconnect',
						value: 'disconnect',
						description: 'Disconnect a session',
						action: 'Disconnect a session',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a session',
						action: 'Delete a session',
					},
				],
				default: 'list',
			},

			// Message Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
					{
						name: 'Send Image',
						value: 'sendImage',
						description: 'Send an image message',
						action: 'Send an image message',
					},
					{
						name: 'Send Document',
						value: 'sendDocument',
						description: 'Send a document',
						action: 'Send a document',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Send a location',
						action: 'Send a location',
					},
					{
						name: 'Forward Message',
						value: 'forwardMessage',
						description: 'Forward an existing message',
						action: 'Forward a message',
					},
					{
						name: 'Reply to Message',
						value: 'replyMessage',
						description: 'Reply to a specific message',
						action: 'Reply to a message',
					},
					{
						name: 'Download Image',
						value: 'downloadImage',
						description: 'Download an image from a received message',
						action: 'Download an image',
					},
				],
				default: 'sendText',
			},

			// Contact Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List contacts',
						action: 'List contacts',
					},
					{
						name: 'Check',
						value: 'check',
						description: 'Check if number is on WhatsApp',
						action: 'Check contact',
					},
				],
				default: 'list',
			},

			// Typing Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['typing'],
					},
				},
				options: [
					{
						name: 'Start Typing',
						value: 'startTyping',
						description: 'Show typing indicator',
						action: 'Start typing indicator',
					},
					{
						name: 'Stop Typing',
						value: 'stopTyping',
						description: 'Hide typing indicator',
						action: 'Stop typing indicator',
					},
				],
				default: 'startTyping',
			},

			// Webhook Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Set URL',
						value: 'setUrl',
						description: 'Set webhook URL for receiving messages',
						action: 'Set webhook URL',
					},
					{
						name: 'Get URL',
						value: 'getUrl',
						description: 'Get current webhook URL',
						action: 'Get webhook URL',
					},
					{
						name: 'Remove',
						value: 'remove',
						description: 'Remove webhook URL',
						action: 'Remove webhook',
					},
				],
				default: 'setUrl',
			},

			// Session ID field (used by most operations)
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				displayOptions: {
					hide: {
						resource: ['session'],
						operation: ['list'],
					},
				},
				default: '',
				placeholder: 'session_123',
				description: 'The WhatsApp session ID',
			},

			// Session creation fields
			{
				displayName: 'Session Name',
				name: 'sessionName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'My WhatsApp Session',
				description: 'Display name for the session',
			},

			// Message fields
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				default: '',
				placeholder: '6281234567890',
				description: 'Recipient phone number (with country code, no +)',
			},

			{
				displayName: 'Message Text',
				name: 'messageText',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
				default: '',
				placeholder: 'Hello from n8n!',
				description: 'The text message to send',
			},

			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendImage'],
					},
				},
				default: '',
				placeholder: 'https://example.com/image.jpg',
				description: 'URL of the image to send',
			},

			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendImage'],
					},
				},
				default: '',
				placeholder: 'Image caption',
				description: 'Optional caption for the image',
			},

			{
				displayName: 'Document URL',
				name: 'documentUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendDocument'],
					},
				},
				default: '',
				placeholder: 'https://example.com/document.pdf',
				description: 'URL of the document to send',
			},

			{
				displayName: 'Filename',
				name: 'filename',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendDocument'],
					},
				},
				default: '',
				placeholder: 'document.pdf',
				description: 'Optional filename for the document',
			},

			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: 0,
				placeholder: '-6.2088',
				description: 'Latitude coordinate',
			},

			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: 0,
				placeholder: '106.8456',
				description: 'Longitude coordinate',
			},

			{
				displayName: 'Location Name',
				name: 'locationName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendLocation'],
					},
				},
				default: '',
				placeholder: 'Jakarta, Indonesia',
				description: 'Optional name for the location',
			},

			// Forward message fields

			{
				displayName: 'Message ID to Forward',
				name: 'forwardMessageId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['forwardMessage'],
					},
				},
				default: '',
				placeholder: '3EB0D136B13F32830F7B88',
				description: 'ID of the message to forward (from webhook trigger data: {{$json.id}}). Must be from the same session.',
			},

			{
				displayName: 'Message Text',
				name: 'forwardMessageText',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['forwardMessage'],
					},
				},
				default: '',
				placeholder: 'Hello, this is the message content to forward',
				description: 'The text content of the message to forward (from webhook trigger data: {{$json.message.text || $json.message.conversation}})',
			},

			// Reply message fields
			{
				displayName: 'Reply Text',
				name: 'replyText',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['replyMessage'],
					},
				},
				default: '',
				placeholder: 'Thank you for your message!',
				description: 'The reply message text',
			},


			{
				displayName: 'Quoted Message ID',
				name: 'quotedMessageId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['replyMessage'],
					},
				},
				default: '',
				placeholder: '3EB0D136B13F32830F7B88',
				description: 'ID of the message to reply to (from webhook trigger data: {{$json.id}}). Must be from the same session.',
			},

			// Download Image fields
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['downloadImage'],
					},
				},
				default: '',
				placeholder: '/api/media/temp/filename.jpg?expires=1234567890',
				description: 'Media URL from webhook trigger data ({{$json.media_url}}). This should be the temporary media URL.',
			},

			{
				displayName: 'Output Format',
				name: 'outputFormat',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['downloadImage'],
					},
				},
				options: [
					{
						name: 'Base64',
						value: 'base64',
						description: 'Return image as base64 encoded string',
					},
					{
						name: 'Binary',
						value: 'binary',
						description: 'Return image as binary data buffer',
					},
					{
						name: 'File',
						value: 'file',
						description: 'Return image as downloadable file attachment',
					},
				],
				default: 'base64',
				description: 'Format for the downloaded image data',
			},

			{
				displayName: 'Put Output File in Field',
				name: 'outputFileField',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['downloadImage'],
						outputFormat: ['file'],
					},
				},
				default: 'data',
				placeholder: 'data',
				description: 'Name of the binary property to write the file to',
			},

			// Contact check field
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['check'],
					},
				},
				default: '',
				placeholder: '6281234567890',
				description: 'Phone number to check (with country code, no +)',
			},

			// Typing fields
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['typing'],
					},
				},
				default: '',
				placeholder: '6281234567890',
				description: 'Phone number to send typing indicator to (with country code, no +)',
			},

			// Webhook fields
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['setUrl'],
					},
				},
				default: '',
				placeholder: 'https://your-server.com/webhook',
				description: 'URL to receive webhook notifications',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('whatsAppMultiSessionApi');
		const baseUrl = credentials.serverUrl as string;

		// Use API key for authentication
		const authHeaders = {
			'Authorization': `Bearer ${credentials.apiKey as string}`,
			'Content-Type': 'application/json',
		};

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				if (resource === 'session') {
					if (operation === 'list') {
						const response = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/sessions`,
							headers: authHeaders,
							json: true,
						});
						// Handle both old format (response.sessions) and new format (response.data)
						const sessions = response.sessions || response.data || [];
						sessions.forEach((session: IDataObject) => {
							returnData.push({ json: session });
						});

					} else if (operation === 'create') {
						const sessionName = this.getNodeParameter('sessionName', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions`,
							headers: authHeaders,
							body: {
								name: sessionName,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'get') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const response = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/sessions/${sessionId}`,
							headers: authHeaders,
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'connect') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/connect`,
							headers: authHeaders,
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'disconnect') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/disconnect`,
							headers: authHeaders,
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'delete') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const response = await this.helpers.request({
							method: 'DELETE',
							url: `${baseUrl}/api/sessions/${sessionId}`,
							headers: authHeaders,
							json: true,
						});
						returnData.push({ json: response });
					}

				} else if (resource === 'message') {
					const sessionId = this.getNodeParameter('sessionId', i) as string;
					const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

					if (operation === 'sendText') {
						const messageText = this.getNodeParameter('messageText', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/send`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
								message: messageText,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'sendImage') {
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;
						const caption = this.getNodeParameter('caption', i, '') as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/send-image`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
								image_url: imageUrl,
								caption: caption,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'sendDocument') {
						const documentUrl = this.getNodeParameter('documentUrl', i) as string;
						const filename = this.getNodeParameter('filename', i, '') as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/send-document`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
								document_url: documentUrl,
								filename: filename,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'sendLocation') {
						const latitude = this.getNodeParameter('latitude', i) as number;
						const longitude = this.getNodeParameter('longitude', i) as number;
						const locationName = this.getNodeParameter('locationName', i, '') as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/send-location`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
								latitude: latitude,
								longitude: longitude,
								name: locationName,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'forwardMessage') {
						const forwardMessageId = this.getNodeParameter('forwardMessageId', i) as string;
						const forwardMessageText = this.getNodeParameter('forwardMessageText', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/forward`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
								message_id: forwardMessageId,
								text: forwardMessageText,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'replyMessage') {
						const replyText = this.getNodeParameter('replyText', i) as string;
						const quotedMessageId = this.getNodeParameter('quotedMessageId', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/reply`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
								message: replyText,
								quoted_message_id: quotedMessageId,
							},
							json: true,
						});
						returnData.push({ json: response });

					} else if (operation === 'downloadImage') {
						const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
						const outputFormat = this.getNodeParameter('outputFormat', i, 'base64') as string;

						// Construct full URL if mediaUrl is relative
						const fullMediaUrl = mediaUrl.startsWith('http') ? mediaUrl : `${baseUrl}${mediaUrl}`;

						try {
							// Download the image with authentication
							const response = await this.helpers.request({
								method: 'GET',
								url: fullMediaUrl,
								headers: {
									'Authorization': `Bearer ${credentials.apiKey as string}`,
								},
								encoding: null, // This ensures binary data is returned as Buffer
								resolveWithFullResponse: true, // Get full response including status code
								simple: false, // Don't throw on HTTP error status codes
							});

							// Handle HTTP error responses
							if (response.statusCode !== 200) {
								let errorMessage = `HTTP ${response.statusCode}`;
								let errorDetails = '';

								// Try to parse error response body
								try {
									const errorBody = response.body?.toString() || '';
									
									// Try to parse as JSON first
									try {
										const errorJson = JSON.parse(errorBody);
										errorMessage = errorJson.message || errorJson.error || errorMessage;
										errorDetails = errorJson.details || '';
									} catch (jsonError) {
										// If not JSON, use plain text
										errorMessage = errorBody.trim() || errorMessage;
									}
								} catch (parseError) {
									// If can't parse body, use status message
									errorMessage = response.statusMessage || errorMessage;
								}

								// Handle specific error cases
								if (response.statusCode === 410) {
									errorMessage = 'Media link has expired';
									errorDetails = 'The temporary media URL has expired. Please request a new media URL from the webhook.';
								} else if (response.statusCode === 404) {
									errorMessage = 'Media file not found';
									errorDetails = 'The requested media file could not be found on the server.';
								} else if (response.statusCode === 401) {
									errorMessage = 'Authentication failed';
									errorDetails = 'Invalid API key or insufficient permissions.';
								} else if (response.statusCode === 403) {
									errorMessage = 'Access forbidden';
									errorDetails = 'Access to the media file is forbidden.';
								}

								// Return structured error response instead of throwing
								returnData.push({
									json: {
										success: false,
										error: true,
										errorCode: response.statusCode,
										errorMessage: errorMessage,
										errorDetails: errorDetails,
										mediaUrl: mediaUrl,
										format: outputFormat,
									}
								});
								continue; // Continue to next item instead of throwing
							}

							// Extract filename from URL
							const urlParts = mediaUrl.split('/');
							const filenameWithParams = urlParts[urlParts.length - 1];
							const filename = filenameWithParams.split('?')[0]; // Remove query parameters

							// Determine content type from URL or default
							const ext = filename.split('.').pop()?.toLowerCase();
							let mimeType = 'application/octet-stream';
							if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
							else if (ext === 'png') mimeType = 'image/png';
							else if (ext === 'gif') mimeType = 'image/gif';
							else if (ext === 'pdf') mimeType = 'application/pdf';
							else if (ext === 'mp4') mimeType = 'video/mp4';
							else if (ext === 'mp3') mimeType = 'audio/mpeg';
							else if (ext === 'ogg') mimeType = 'audio/ogg';

							const responseBody = response.body;

							if (outputFormat === 'base64') {
								// Return as base64
								const base64Data = Buffer.from(responseBody).toString('base64');
								returnData.push({
									json: {
										success: true,
										message: 'Image downloaded successfully',
										data: base64Data,
										size: responseBody.length,
										mimeType: mimeType,
										format: 'base64',
										filename: filename,
									}
								});
							} else if (outputFormat === 'binary') {
								// Return as binary buffer
								returnData.push({
									json: {
										success: true,
										message: 'Image downloaded successfully',
										data: responseBody,
										size: responseBody.length,
										mimeType: mimeType,
										format: 'binary',
										filename: filename,
									}
								});
							} else if (outputFormat === 'file') {
								// Return as n8n binary file attachment
								const outputFileField = this.getNodeParameter('outputFileField', i, 'data') as string;
								
								const binaryData: IBinaryData = {
									data: Buffer.from(responseBody).toString('base64'),
									mimeType: mimeType,
									fileName: filename,
									fileExtension: ext || '',
								};

								// Create the return item with binary data
								returnData.push({
									json: {
										success: true,
										message: 'Image downloaded successfully',
										size: responseBody.length,
										mimeType: mimeType,
										format: 'file',
										filename: filename,
									},
									binary: {
										[outputFileField]: binaryData,
									},
								});
							}
						} catch (downloadError) {
							// Handle network errors and other exceptions
							const error = downloadError as any;
							let errorMessage = 'Network error or request failed';
							let errorDetails = error.message || '';

							// Try to extract more specific error information
							if (error.code) {
								errorMessage = `Network error: ${error.code}`;
							} else if (error.response?.statusCode) {
								errorMessage = `HTTP ${error.response.statusCode}`;
								if (error.response.body) {
									try {
										const errorBody = error.response.body.toString();
										const errorJson = JSON.parse(errorBody);
										errorDetails = errorJson.message || errorJson.error || errorBody;
									} catch {
										errorDetails = error.response.body.toString();
									}
								}
							}

							// Return structured error response instead of throwing
							returnData.push({
								json: {
									success: false,
									error: true,
									errorMessage: errorMessage,
									errorDetails: errorDetails,
									mediaUrl: mediaUrl,
									format: outputFormat,
								}
							});
						}
					}

				} else if (resource === 'contact') {
					const sessionId = this.getNodeParameter('sessionId', i) as string;

					if (operation === 'list') {
						const response = await this.helpers.request({
							method: 'GET',
							url: `${baseUrl}/api/sessions/${sessionId}/contacts`,
							headers: authHeaders,
							json: true,
						});
						// Handle both old format (response.contacts) and new format (response.data)
						const contacts = response.contacts || response.data || [];
						contacts.forEach((contact: IDataObject) => {
							returnData.push({ json: contact });
						});

					} else if (operation === 'check') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const response = await this.helpers.request({
							method: 'POST',
							url: `${baseUrl}/api/sessions/${sessionId}/check-phone`,
							headers: authHeaders,
							body: {
								to: phoneNumber,
							},
							json: true,
						});
						returnData.push({ json: response });
					}

			} else if (resource === 'typing') {
				const sessionId = this.getNodeParameter('sessionId', i) as string;
				const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

				if (operation === 'startTyping') {
					const response = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}/api/sessions/${sessionId}/typing`,
						headers: authHeaders,
						body: {
							to: phoneNumber,
							typing: true,
						},
						json: true,
					});
					returnData.push({ json: response });

				} else if (operation === 'stopTyping') {
					const response = await this.helpers.request({
						method: 'POST',
						url: `${baseUrl}/api/sessions/${sessionId}/typing`,
						headers: authHeaders,
						body: {
							to: phoneNumber,
							typing: false,
						},
						json: true,
					});
					returnData.push({ json: response });
				}

			} else if (resource === 'webhook') {
				const sessionId = this.getNodeParameter('sessionId', i) as string;

				if (operation === 'setUrl') {
					const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
					const response = await this.helpers.request({
						method: 'PUT',
						url: `${baseUrl}/api/sessions/${sessionId}/webhook`,
						headers: authHeaders,
						body: {
							webhook_url: webhookUrl,
						},
						json: true,
					});
					returnData.push({ json: response });

				} else if (operation === 'getUrl') {
					const response = await this.helpers.request({
						method: 'GET',
						url: `${baseUrl}/api/sessions/${sessionId}/webhook`,
						headers: authHeaders,
						json: true,
					});
					returnData.push({ json: response });

				} else if (operation === 'remove') {
					const response = await this.helpers.request({
						method: 'DELETE',
						url: `${baseUrl}/api/sessions/${sessionId}/webhook`,
						headers: authHeaders,
						json: true,
					});
					returnData.push({ json: response });
				}
			}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}