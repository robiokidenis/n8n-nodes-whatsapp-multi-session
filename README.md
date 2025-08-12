# n8n-nodes-whatsapp-multi-session

This is an n8n community node for integrating with WhatsApp Multi-Session API. It allows you to send WhatsApp messages, manage sessions, and interact with contacts directly from your n8n workflows.

## Features

- 📱 **Session Management**: Create, connect, disconnect, and manage WhatsApp sessions
- 💬 **Message Sending**: Send text, images, documents, and location messages
- 👥 **Contact Management**: List contacts and check if numbers are on WhatsApp
- ⌨️ **Typing Indicators**: Show/hide typing status for better user experience
- 🔗 **Webhook Support**: Receive real-time message notifications
- 📨 **Webhook Trigger**: Dedicated trigger node for receiving incoming WhatsApp messages
- 🔐 **API Key Authentication**: Secure authentication with API keys

## Installation

### Community Nodes (Recommended)

1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Click **Install a community node**
3. Enter: `n8n-nodes-whatsapp-multi-session`
4. Click **Install**

### Manual Installation

1. Navigate to your n8n installation folder
2. Open a terminal/command prompt
3. Run:
```bash
npm install n8n-nodes-whatsapp-multi-session
```

### Docker Installation

If you're using n8n with Docker, add this to your Dockerfile or docker-compose:

```dockerfile
# Add to your n8n Dockerfile
RUN npm install -g n8n-nodes-whatsapp-multi-session
```

Or for docker-compose:
```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      - NPM_CONFIG_PREFIX=/usr/local/lib/node_modules
    volumes:
      - ./n8n-data:/home/node/.n8n
    command: >
      /bin/sh -c "
      npm install -g n8n-nodes-whatsapp-multi-session &&
      n8n start
      "
```

## Prerequisites

Before using this node, you need:

1. **WhatsApp Multi-Session API Server** running and accessible
2. **API Key** for authentication
3. **At least one WhatsApp session** configured

### Setting up WhatsApp Multi-Session API

1. Deploy the WhatsApp Multi-Session API server:
```bash
git clone https://github.com/your-username/whatsapp-multi-session
cd whatsapp-multi-session
docker-compose up -d
```

2. Access the web interface at `http://your-server:8080`
3. Login with default credentials: `admin` / `admin123`
4. Create and connect a WhatsApp session

## Configuration

### Credentials Setup

1. In n8n, create a new credential of type **"WhatsApp Multi-Session API"**
2. Fill in the required fields:
   - **Server URL**: Your API server URL (e.g., `http://localhost:8080`)
   - **API Key**: Your API key for authentication
3. Test the connection and save

### Node Configuration

1. Add the **"WhatsApp Multi-Session"** node to your workflow
2. Select your configured credentials
3. Choose the resource (Session, Message, or Contact)
4. Select the operation you want to perform
5. Fill in the required parameters

## Usage Examples

### 1. Send a Text Message

```json
{
  "resource": "message",
  "operation": "sendText",
  "sessionId": "session_123",
  "phoneNumber": "6281234567890",
  "messageText": "Hello from n8n! 👋"
}
```

### 2. Send an Image with Caption

```json
{
  "resource": "message",
  "operation": "sendImage",
  "sessionId": "session_123",
  "phoneNumber": "6281234567890",
  "imageUrl": "https://example.com/image.jpg",
  "caption": "Check out this image!"
}
```

### 3. Create a New Session

```json
{
  "resource": "session",
  "operation": "create",
  "sessionName": "My Bot Session"
}
```

### 4. Check if Number is on WhatsApp

```json
{
  "resource": "contact",
  "operation": "check",
  "sessionId": "session_123",
  "phoneNumber": "6281234567890"
}
```

### 5. Send Location

```json
{
  "resource": "message",
  "operation": "sendLocation",
  "sessionId": "session_123",
  "phoneNumber": "6281234567890",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "locationName": "Jakarta, Indonesia"
}
```

### 6. Receive WhatsApp Messages (Webhook Trigger)

```json
{
  "nodes": [
    {
      "name": "WhatsApp Message Received",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSessionTrigger",
      "parameters": {
        "sessionIdFilter": "my_session",
        "messageTypeFilter": "text",
        "includeSystemMessages": false
      }
    },
    {
      "name": "Process Message",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Access the structured webhook data\nconst message = $json.message;\nconst senderPhone = $json.from_phone;\nconst senderName = $json.from_name;\n\nreturn { message, senderPhone, senderName };"
      }
    },
    {
      "name": "Send Auto Reply",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "my_session", 
        "phoneNumber": "={{$json.from_phone}}",
        "messageText": "Thanks for your message: {{$json.message}}"
      }
    }
  ]
}
```

## Common Workflow Patterns

### 1. Customer Support Bot

1. **Webhook Trigger** → Receive incoming messages
2. **WhatsApp Multi-Session** → Check contact info
3. **AI Node** → Process message with ChatGPT/Claude
4. **WhatsApp Multi-Session** → Send automated response

### 2. Marketing Campaign

1. **Spreadsheet Trigger** → Read customer list
2. **WhatsApp Multi-Session** → Check if numbers are valid
3. **Filter** → Only valid WhatsApp numbers
4. **WhatsApp Multi-Session** → Send personalized messages
5. **Database** → Log sent messages

### 3. Order Notifications

1. **E-commerce Webhook** → New order received
2. **WhatsApp Multi-Session** → Send order confirmation
3. **Wait** → Delay for shipping
4. **WhatsApp Multi-Session** → Send tracking information

## Available Operations

### Session Operations
- **Create**: Create a new WhatsApp session
- **Get**: Get session information and status
- **List**: List all available sessions
- **Connect**: Connect session (generates QR code)
- **Disconnect**: Disconnect active session
- **Delete**: Remove session permanently

### Message Operations
- **Send Text**: Send plain text messages
- **Send Image**: Send images with optional captions
- **Send Document**: Send files/documents
- **Send Location**: Send GPS coordinates

### Contact Operations
- **List**: Get all contacts from session
- **Check**: Verify if number has WhatsApp

### Typing Operations
- **Start Typing**: Show typing indicator to recipient
- **Stop Typing**: Hide typing indicator

### Webhook Operations  
- **Set URL**: Configure webhook URL for receiving messages
- **Get URL**: Retrieve current webhook configuration
- **Remove**: Delete webhook configuration

### Webhook Trigger Node
- **WhatsApp Multi-Session Trigger**: Dedicated trigger node for receiving incoming messages
- **Message Filtering**: Filter by session ID, message type, and system messages
- **Structured Data**: Clean, structured webhook data with phone number extraction
- **Real-time Processing**: Immediate processing of incoming WhatsApp messages

## Error Handling

The node includes built-in error handling:

- **Authentication errors**: Automatically retries login
- **Session errors**: Provides clear error messages
- **Network errors**: Includes retry logic
- **Validation errors**: Helpful parameter validation

Enable **"Continue on Fail"** in node settings to handle errors gracefully in your workflow.

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Verify server URL is correct and accessible
   - Check username/password credentials
   - Ensure API server is running

2. **"Session not found"**
   - Verify session ID exists
   - Check if session is connected
   - List sessions to see available IDs

3. **"Failed to send message"**
   - Ensure phone number includes country code
   - Verify session is connected to WhatsApp
   - Check if recipient number has WhatsApp

4. **"Connection timeout"**
   - Check network connectivity to API server
   - Verify firewall/security group settings
   - Increase timeout in node settings

### Debug Mode

Enable debug mode in n8n to see detailed API requests and responses:

1. Set environment variable: `N8N_LOG_LEVEL=debug`
2. Restart n8n
3. Check logs for detailed error information

## API Server Requirements

- **Minimum Version**: WhatsApp Multi-Session API v1.0+
- **Authentication**: JWT-based authentication
- **Network Access**: API server must be accessible from n8n instance
- **Session State**: At least one connected WhatsApp session

## Security Considerations

- Store API credentials securely in n8n credentials store
- Use HTTPS for API server communication in production
- Implement rate limiting to avoid WhatsApp restrictions
- Regular backup of session data
- Monitor for unusual activity patterns

## Support

- **Documentation**: [API Documentation](https://github.com/your-username/whatsapp-multi-session)
- **Issues**: [GitHub Issues](https://github.com/your-username/n8n-nodes-whatsapp-multi-session/issues)
- **Community**: [n8n Community Forum](https://community.n8n.io)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Support for text, image, document, and location messages
- Session management operations
- Contact operations
- JWT authentication