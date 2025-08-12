"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMultiSessionApi = void 0;
class WhatsAppMultiSessionApi {
    constructor() {
        this.name = 'whatsAppMultiSessionApi';
        this.displayName = 'WhatsApp Multi-Session API';
        this.documentationUrl = 'https://github.com/robiokidenis/whatsapp-multi-session';
        this.properties = [
            {
                displayName: 'Server URL',
                name: 'serverUrl',
                type: 'string',
                default: 'http://localhost:8080',
                placeholder: 'http://your-server:8080',
                description: 'The base URL of your WhatsApp Multi-Session API server',
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                placeholder: 'your-api-key-here',
                description: 'API key for authentication',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-API-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.serverUrl}}',
                url: '/api/health',
                method: 'GET',
                headers: {
                    'X-API-Key': '={{$credentials.apiKey}}',
                },
            },
        };
    }
}
exports.WhatsAppMultiSessionApi = WhatsAppMultiSessionApi;
