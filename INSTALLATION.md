# Installation Guide - WhatsApp Multi-Session n8n Node

## Quick Start

### Method 1: Direct Installation in n8n (Recommended for Development)

1. **Clone/Download the node files**:
```bash
git clone https://github.com/your-username/n8n-nodes-whatsapp-multi-session
cd n8n-nodes-whatsapp-multi-session
```

2. **Build the node**:
```bash
./build.sh
```

3. **Copy to n8n custom nodes**:
```bash
# For local n8n installation
cp -r dist/* ~/.n8n/custom/

# For Docker n8n
docker cp dist/. your-n8n-container:/home/node/.n8n/custom/
```

4. **Restart n8n**:
```bash
# Local installation
systemctl restart n8n

# Docker
docker restart your-n8n-container
```

### Method 2: Development Mode

1. **Install in development**:
```bash
cd /path/to/your/n8n/installation
npm install /path/to/n8n-nodes-whatsapp-multi-session
```

2. **Restart n8n with custom nodes**:
```bash
n8n start --tunnel
```

### Method 3: Community Nodes (For Published Package)

1. **Via n8n Interface**:
   - Go to Settings → Community Nodes
   - Click "Install a community node"
   - Enter: `n8n-nodes-whatsapp-multi-session`
   - Click Install

2. **Via npm**:
```bash
npm install n8n-nodes-whatsapp-multi-session
```

## Docker Installation

### Docker Compose (Recommended)

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=admin123
      - WEBHOOK_URL=http://localhost:5678/
    volumes:
      - n8n_data:/home/node/.n8n
      - ./n8n-nodes-whatsapp-multi-session/dist:/home/node/.n8n/custom:ro
    command: >
      /bin/sh -c "
      npm install -g n8n-nodes-whatsapp-multi-session &&
      n8n start
      "

volumes:
  n8n_data:
```

### Dockerfile

```dockerfile
FROM n8nio/n8n:latest

# Install custom node
RUN npm install -g n8n-nodes-whatsapp-multi-session

# Copy custom nodes (alternative method)
# COPY dist/ /home/node/.n8n/custom/

USER node
```

## Kubernetes Installation

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: n8n-with-whatsapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: n8n
  template:
    metadata:
      labels:
        app: n8n
    spec:
      containers:
      - name: n8n
        image: n8nio/n8n:latest
        ports:
        - containerPort: 5678
        env:
        - name: N8N_BASIC_AUTH_ACTIVE
          value: "true"
        - name: N8N_BASIC_AUTH_USER
          value: "admin"
        - name: N8N_BASIC_AUTH_PASSWORD
          value: "admin123"
        volumeMounts:
        - name: n8n-data
          mountPath: /home/node/.n8n
        - name: custom-nodes
          mountPath: /home/node/.n8n/custom
        command: ["/bin/sh"]
        args: ["-c", "npm install -g n8n-nodes-whatsapp-multi-session && n8n start"]
      volumes:
      - name: n8n-data
        persistentVolumeClaim:
          claimName: n8n-data-pvc
      - name: custom-nodes
        configMap:
          name: whatsapp-node-config
```

## Verification

After installation, verify the node is available:

1. **Check n8n logs**:
```bash
# Look for successful node registration
docker logs your-n8n-container | grep -i whatsapp
```

2. **In n8n Interface**:
   - Create a new workflow
   - Click the "+" to add a node
   - Search for "WhatsApp Multi-Session"
   - You should see the node available

3. **Test Connection**:
   - Add the WhatsApp Multi-Session node
   - Configure credentials with your API server
   - Try the "List Sessions" operation

## Environment Setup

### Prerequisites Checklist

- ✅ n8n instance running (version 0.190.0+)
- ✅ WhatsApp Multi-Session API server accessible
- ✅ Admin credentials for API server
- ✅ At least one WhatsApp session configured

### WhatsApp API Server Setup

1. **Deploy WhatsApp Multi-Session API**:
```bash
git clone https://github.com/your-username/whatsapp-multi-session
cd whatsapp-multi-session
docker-compose up -d
```

2. **Verify API is running**:
```bash
curl http://localhost:8080/api/health
# Should return: {"status":"ok","service":"whatsapp-multi-session"}
```

3. **Login and create session**:
   - Access: http://localhost:8080
   - Login: admin / admin123
   - Create new session
   - Scan QR code with WhatsApp

## Troubleshooting

### Node Not Appearing

1. **Check n8n logs**:
```bash
# Docker
docker logs n8n-container-name

# Local
journalctl -u n8n -f
```

2. **Verify file permissions**:
```bash
ls -la ~/.n8n/custom/
# Files should be readable by n8n user
```

3. **Clear n8n cache**:
```bash
# Stop n8n, remove cache, restart
rm -rf ~/.n8n/cache/
```

### Build Issues

1. **Install dependencies**:
```bash
npm install
npm install -D typescript @types/node
```

2. **Manual TypeScript compilation**:
```bash
npx tsc --init
npx tsc
```

3. **Check TypeScript errors**:
```bash
npx tsc --noEmit
```

### Runtime Errors

1. **Check API connectivity**:
```bash
# Test from n8n container
curl http://your-api-server:8080/api/health
```

2. **Verify credentials**:
```bash
# Test login
curl -X POST http://your-api-server:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Development Setup

### For Node Development

1. **Clone and setup**:
```bash
git clone https://github.com/your-username/n8n-nodes-whatsapp-multi-session
cd n8n-nodes-whatsapp-multi-session
npm install
```

2. **Development build**:
```bash
npm run dev  # Watch mode
# Or
npm run build  # One-time build
```

3. **Link to n8n**:
```bash
npm link
cd /path/to/n8n
npm link n8n-nodes-whatsapp-multi-session
```

### File Structure

```
n8n-nodes-whatsapp-multi-session/
├── package.json                 # Package configuration
├── tsconfig.json               # TypeScript config
├── credentials/                # Credentials definition
│   └── WhatsAppMultiSessionApi.credentials.ts
├── nodes/                      # Node implementations
│   └── WhatsAppMultiSession/
│       ├── WhatsAppMultiSession.node.ts
│       └── whatsapp.svg
├── dist/                       # Built files (auto-generated)
└── README.md                   # Documentation
```

## Support

If you encounter issues:

1. **Check logs** for detailed error messages
2. **Verify API server** is accessible and functional
3. **Test credentials** manually with curl/Postman
4. **Check n8n version** compatibility
5. **Create issue** on GitHub with logs and configuration details

## Next Steps

After successful installation:

1. **Configure credentials** in n8n
2. **Create test workflow** with simple message sending
3. **Explore advanced features** like webhooks and automation
4. **Set up monitoring** for production use
5. **Review security settings** for your deployment