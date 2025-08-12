# Usage Examples - WhatsApp Multi-Session n8n Node

## Quick Start Workflows

### 1. Simple Message Sender

**Use Case**: Send a welcome message to new customers

```json
{
  "nodes": [
    {
      "name": "Send Welcome Message",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "customer_service",
        "phoneNumber": "6281234567890",
        "messageText": "Welcome to our service! 🎉\n\nThanks for joining us. If you have any questions, just reply to this message."
      }
    }
  ]
}
```

### 2. Bulk Message Sender

**Use Case**: Send promotional messages to customer list

```json
{
  "nodes": [
    {
      "name": "Read Customer List",
      "type": "n8n-nodes-base.spreadsheetFile",
      "parameters": {
        "operation": "read",
        "filePath": "/data/customers.csv"
      }
    },
    {
      "name": "Check WhatsApp Number",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession", 
      "parameters": {
        "resource": "contact",
        "operation": "check",
        "sessionId": "marketing",
        "phoneNumber": "={{$json.phone}}"
      }
    },
    {
      "name": "Send Promo Message",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message", 
        "operation": "sendText",
        "sessionId": "marketing",
        "phoneNumber": "={{$json.phone}}",
        "messageText": "Hi {{$json.name}}! 🛍️\n\nSpecial 50% OFF just for you!\nUse code: SAVE50\nValid until tomorrow."
      }
    }
  ]
}
```

### 3. Order Notification System

**Use Case**: Automatic order confirmation and tracking

```json
{
  "nodes": [
    {
      "name": "Webhook - New Order",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "new-order",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Send Order Confirmation",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText", 
        "sessionId": "orders",
        "phoneNumber": "={{$json.customer_phone}}",
        "messageText": "✅ Order Confirmed!\n\nOrder #{{$json.order_id}}\nTotal: ${{$json.total}}\n\nWe'll send tracking info soon!"
      }
    },
    {
      "name": "Wait 1 Hour",
      "type": "n8n-nodes-base.wait",
      "parameters": {
        "amount": 1,
        "unit": "hours"
      }
    },
    {
      "name": "Send Tracking Info",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "orders", 
        "phoneNumber": "={{$json.customer_phone}}",
        "messageText": "📦 Your order is being prepared!\n\nTracking: {{$json.tracking_number}}\nEstimated delivery: {{$json.delivery_date}}"
      }
    }
  ]
}
```

### 4. Customer Support Bot

**Use Case**: AI-powered customer support with ChatGPT

```json
{
  "nodes": [
    {
      "name": "Webhook - WhatsApp Message",
      "type": "n8n-nodes-base.webhook", 
      "parameters": {
        "path": "whatsapp-webhook",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Process with ChatGPT",
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "operation": "chat",
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful customer support agent. Keep responses concise and friendly."
          },
          {
            "role": "user", 
            "content": "={{$json.message}}"
          }
        ]
      }
    },
    {
      "name": "Send AI Response",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "support",
        "phoneNumber": "={{$json.from}}",
        "messageText": "={{$json.choices[0].message.content}}"
      }
    }
  ]
}
```

### 5. Event Reminder System

**Use Case**: Send event reminders with location

```json
{
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "rule": {
          "hour": 9,
          "minute": 0
        }
      }
    },
    {
      "name": "Get Today's Events", 
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "read",
        "sheetId": "your-sheet-id",
        "range": "Events!A:E"
      }
    },
    {
      "name": "Send Event Reminder",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "events",
        "phoneNumber": "={{$json.phone}}",
        "messageText": "📅 Event Reminder!\n\n{{$json.event_name}}\n🕐 Today at {{$json.time}}\n📍 {{$json.location}}\n\nSee you there!"
      }
    },
    {
      "name": "Send Location",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendLocation",
        "sessionId": "events",
        "phoneNumber": "={{$json.phone}}",
        "latitude": "={{$json.lat}}",
        "longitude": "={{$json.lng}}",
        "locationName": "={{$json.location}}"
      }
    }
  ]
}
```

## Advanced Examples

### 6. Media Broadcasting

**Use Case**: Send images and documents to multiple recipients

```json
{
  "name": "Send Product Catalog",
  "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
  "parameters": {
    "resource": "message",
    "operation": "sendImage",
    "sessionId": "marketing",
    "phoneNumber": "={{$json.customer_phone}}",
    "imageUrl": "https://yourstore.com/catalog.jpg",
    "caption": "📱 New Products Available!\n\nCheck out our latest collection.\nShop now: yourstore.com"
  }
}
```

### 7. Document Sharing

```json
{
  "name": "Send Invoice PDF",
  "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
  "parameters": {
    "resource": "message",
    "operation": "sendDocument", 
    "sessionId": "billing",
    "phoneNumber": "={{$json.customer_phone}}",
    "documentUrl": "https://yourdomain.com/invoices/{{$json.invoice_id}}.pdf",
    "filename": "Invoice_{{$json.invoice_id}}.pdf"
  }
}
```

### 8. Session Management

**Use Case**: Automated session health monitoring

```json
{
  "nodes": [
    {
      "name": "Check All Sessions",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "session",
        "operation": "list"
      }
    },
    {
      "name": "Filter Disconnected",
      "type": "n8n-nodes-base.filter",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$json.connected}}",
              "operation": "equal",
              "value2": "false"
            }
          ]
        }
      }
    },
    {
      "name": "Reconnect Session",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "session",
        "operation": "connect",
        "sessionId": "={{$json.id}}"
      }
    },
    {
      "name": "Alert Admin",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "operation": "post",
        "channel": "#alerts",
        "text": "🚨 WhatsApp session {{$json.id}} was disconnected and reconnected"
      }
    }
  ]
}
```

## Conditional Logic Examples

### 9. Smart Message Routing

```json
{
  "nodes": [
    {
      "name": "Webhook - Message Received",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "name": "Check Message Type",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "rules": [
          {
            "operation": "contains",
            "value1": "={{$json.message}}",
            "value2": "order"
          },
          {
            "operation": "contains", 
            "value1": "={{$json.message}}",
            "value2": "support"
          },
          {
            "operation": "contains",
            "value1": "={{$json.message}}",
            "value2": "billing"
          }
        ]
      }
    },
    {
      "name": "Route to Orders Team",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "orders",
        "phoneNumber": "={{$json.from}}",
        "messageText": "📦 Thanks for your order inquiry! Our orders team will help you shortly."
      }
    },
    {
      "name": "Route to Support Team", 
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "support",
        "phoneNumber": "={{$json.from}}",
        "messageText": "🛠️ We're here to help! A support agent will assist you soon."
      }
    }
  ]
}
```

### 10. Time-Based Messaging

```json
{
  "nodes": [
    {
      "name": "Check Business Hours",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "const now = new Date();\nconst hour = now.getHours();\nconst isBusinessHours = hour >= 9 && hour <= 17;\nreturn [{ isBusinessHours }];"
      }
    },
    {
      "name": "Business Hours Response",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "support",
        "phoneNumber": "={{$json.from}}",
        "messageText": "👋 Thanks for contacting us!\n\nOur team is available and will respond shortly.\nBusiness hours: 9 AM - 5 PM"
      }
    },
    {
      "name": "After Hours Response",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession", 
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "support",
        "phoneNumber": "={{$json.from}}",
        "messageText": "🌙 Thanks for your message!\n\nWe're currently closed but will respond first thing tomorrow.\nBusiness hours: 9 AM - 5 PM"
      }
    }
  ]
}
```

## Error Handling Examples

### 11. Robust Message Sending

```json
{
  "nodes": [
    {
      "name": "Try Send Message",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "primary",
        "phoneNumber": "={{$json.phone}}",
        "messageText": "={{$json.message}}"
      },
      "continueOnFail": true
    },
    {
      "name": "Check for Errors",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$json.error}}",
              "operation": "isEmpty"
            }
          ]
        }
      }
    },
    {
      "name": "Retry with Backup Session",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText", 
        "sessionId": "backup",
        "phoneNumber": "={{$json.phone}}",
        "messageText": "={{$json.message}}"
      }
    },
    {
      "name": "Log Failed Message",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "append",
        "sheetId": "failed-messages-log",
        "range": "A:C",
        "values": [
          ["={{$json.phone}}", "={{$json.message}}", "={{new Date().toISOString()}}"]
        ]
      }
    }
  ]
}
```

## Integration Examples

### 12. CRM Integration

**Use Case**: Sync WhatsApp conversations with CRM

```json
{
  "nodes": [
    {
      "name": "Webhook - Message Received",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "name": "Find Customer in CRM",
      "type": "n8n-nodes-base.hubspot",
      "parameters": {
        "operation": "search",
        "resource": "contact",
        "searchCriteria": {
          "phone": "={{$json.from}}"
        }
      }
    },
    {
      "name": "Update Contact Record",
      "type": "n8n-nodes-base.hubspot",
      "parameters": {
        "operation": "update",
        "resource": "contact",
        "contactId": "={{$json.id}}",
        "properties": {
          "last_whatsapp_message": "={{$json.message}}",
          "last_contact_date": "={{new Date().toISOString()}}"
        }
      }
    },
    {
      "name": "Send Auto Response",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "crm",
        "phoneNumber": "={{$json.from}}",
        "messageText": "Hi {{$json.firstname}}! 👋\n\nThanks for your message. We'll get back to you soon!"
      }
    }
  ]
}
```

### 12. Message Forwarding System

**Use Case**: Forward important messages between teams or escalate customer issues

```json
{
  "nodes": [
    {
      "name": "Webhook - Message Received",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "whatsapp-received",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Check for Keywords",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "string": [
            {
              "operation": "contains",
              "value1": "={{$json.message.text || $json.message.conversation}}",
              "value2": "urgent"
            }
          ]
        }
      }
    },
    {
      "name": "Forward to Manager",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "forwardMessage",
        "sessionId": "team_manager",
        "phoneNumber": "6281234567890",
        "forwardMessageId": "={{$json.id}}",
        "forwardMessageText": "={{$json.message.text || $json.message.conversation}}"
      }
    },
    {
      "name": "Send Escalation Note",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "sendText",
        "sessionId": "team_manager",
        "phoneNumber": "6281234567890",
        "messageText": "🚨 Urgent message forwarded from {{$json.from}}\n\nPlease handle with priority."
      }
    }
  ]
}
```

### 13. Customer Service Message Distribution

**Use Case**: Automatically forward customer messages to appropriate departments

```json
{
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "name": "Determine Department",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "rules": [
          {
            "operation": "contains",
            "value1": "={{$json.message.text}}",
            "value2": "billing"
          },
          {
            "operation": "contains",
            "value1": "={{$json.message.text}}",
            "value2": "technical"
          }
        ]
      }
    },
    {
      "name": "Forward to Billing Team",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "forwardMessage",
        "sessionId": "billing_team",
        "phoneNumber": "6281234567891",
        "forwardMessageId": "={{$json.id}}",
        "forwardMessageText": "={{$json.message.text || $json.message.conversation}}"
      }
    },
    {
      "name": "Forward to Tech Support",
      "type": "n8n-nodes-whatsapp-multi-session.whatsAppMultiSession",
      "parameters": {
        "resource": "message",
        "operation": "forwardMessage",
        "sessionId": "tech_support",
        "phoneNumber": "6281234567892",
        "forwardMessageId": "={{$json.id}}",
        "forwardMessageText": "={{$json.message.text || $json.message.conversation}}"
      }
    }
  ]
}
```

## Updated Forward Message API (v1.4.0)

**Important Note**: Starting with version 1.4.0, the forward message operation now requires both the original message ID and the message text content. This ensures that the forwarded message preserves the original content properly.

**Required Parameters**:
- `forwardMessageId`: The ID of the original message to forward
- `forwardMessageText`: The text content of the message to forward

**Example Usage**:
```json
{
  "forwardMessageId": "{{$json.id}}",
  "forwardMessageText": "{{$json.message.text || $json.message.conversation}}"
}
```

These examples demonstrate the flexibility and power of the WhatsApp Multi-Session n8n node. You can combine these patterns to create sophisticated automation workflows for your business needs.