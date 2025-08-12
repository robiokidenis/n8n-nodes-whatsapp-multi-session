"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMultiSession = void 0;
class WhatsAppMultiSession {
    constructor() {
        this.description = {
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
            inputs: [{ displayName: '', type: "main" /* NodeConnectionType.Main */ }],
            outputs: [{ displayName: '', type: "main" /* NodeConnectionType.Main */ }],
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('whatsAppMultiSessionApi');
        const baseUrl = credentials.serverUrl;
        // Use API key for authentication
        const authHeaders = {
            'Authorization': `Bearer ${credentials.apiKey}`,
            'Content-Type': 'application/json',
        };
        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i);
            const operation = this.getNodeParameter('operation', i);
            try {
                if (resource === 'session') {
                    if (operation === 'list') {
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/sessions`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(...response.sessions);
                    }
                    else if (operation === 'create') {
                        const sessionName = this.getNodeParameter('sessionName', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/sessions`,
                            headers: authHeaders,
                            body: {
                                name: sessionName,
                            },
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'get') {
                        const sessionId = this.getNodeParameter('sessionId', i);
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/sessions/${sessionId}`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'connect') {
                        const sessionId = this.getNodeParameter('sessionId', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/sessions/${sessionId}/connect`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'disconnect') {
                        const sessionId = this.getNodeParameter('sessionId', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/sessions/${sessionId}/disconnect`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'delete') {
                        const sessionId = this.getNodeParameter('sessionId', i);
                        const response = await this.helpers.request({
                            method: 'DELETE',
                            url: `${baseUrl}/api/sessions/${sessionId}`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(response);
                    }
                }
                else if (resource === 'message') {
                    const sessionId = this.getNodeParameter('sessionId', i);
                    const phoneNumber = this.getNodeParameter('phoneNumber', i);
                    if (operation === 'sendText') {
                        const messageText = this.getNodeParameter('messageText', i);
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
                        returnData.push(response);
                    }
                    else if (operation === 'sendImage') {
                        const imageUrl = this.getNodeParameter('imageUrl', i);
                        const caption = this.getNodeParameter('caption', i, '');
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
                        returnData.push(response);
                    }
                    else if (operation === 'sendDocument') {
                        const documentUrl = this.getNodeParameter('documentUrl', i);
                        const filename = this.getNodeParameter('filename', i, '');
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
                        returnData.push(response);
                    }
                    else if (operation === 'sendLocation') {
                        const latitude = this.getNodeParameter('latitude', i);
                        const longitude = this.getNodeParameter('longitude', i);
                        const locationName = this.getNodeParameter('locationName', i, '');
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
                        returnData.push(response);
                    }
                    else if (operation === 'forwardMessage') {
                        const forwardMessageId = this.getNodeParameter('forwardMessageId', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/sessions/${sessionId}/forward`,
                            headers: authHeaders,
                            body: {
                                to: phoneNumber,
                                message_id: forwardMessageId,
                            },
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'replyMessage') {
                        const replyText = this.getNodeParameter('replyText', i);
                        const quotedMessageId = this.getNodeParameter('quotedMessageId', i);
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
                        returnData.push(response);
                    }
                }
                else if (resource === 'contact') {
                    const sessionId = this.getNodeParameter('sessionId', i);
                    if (operation === 'list') {
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/sessions/${sessionId}/contacts`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(...response.contacts);
                    }
                    else if (operation === 'check') {
                        const phoneNumber = this.getNodeParameter('phoneNumber', i);
                        const response = await this.helpers.request({
                            method: 'POST',
                            url: `${baseUrl}/api/sessions/${sessionId}/check-phone`,
                            headers: authHeaders,
                            body: {
                                to: phoneNumber,
                            },
                            json: true,
                        });
                        returnData.push(response);
                    }
                }
                else if (resource === 'typing') {
                    const sessionId = this.getNodeParameter('sessionId', i);
                    const phoneNumber = this.getNodeParameter('phoneNumber', i);
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
                        returnData.push(response);
                    }
                    else if (operation === 'stopTyping') {
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
                        returnData.push(response);
                    }
                }
                else if (resource === 'webhook') {
                    const sessionId = this.getNodeParameter('sessionId', i);
                    if (operation === 'setUrl') {
                        const webhookUrl = this.getNodeParameter('webhookUrl', i);
                        const response = await this.helpers.request({
                            method: 'PUT',
                            url: `${baseUrl}/api/sessions/${sessionId}/webhook`,
                            headers: authHeaders,
                            body: {
                                webhook_url: webhookUrl,
                            },
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'getUrl') {
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: `${baseUrl}/api/sessions/${sessionId}/webhook`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(response);
                    }
                    else if (operation === 'remove') {
                        const response = await this.helpers.request({
                            method: 'DELETE',
                            url: `${baseUrl}/api/sessions/${sessionId}/webhook`,
                            headers: authHeaders,
                            json: true,
                        });
                        returnData.push(response);
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ error: error.message });
                }
                else {
                    throw error;
                }
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.WhatsAppMultiSession = WhatsAppMultiSession;
