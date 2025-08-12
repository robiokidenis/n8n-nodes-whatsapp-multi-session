import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WhatsAppMultiSessionApi implements ICredentialType {
	name = 'whatsAppMultiSessionApi';
	displayName = 'WhatsApp Multi-Session API';
	documentationUrl = 'https://github.com/robiokidenis/whatsapp-multi-session';
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.serverUrl}}',
			url: '/api/health',
			method: 'GET',
			headers: {
				'Authorization': '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}