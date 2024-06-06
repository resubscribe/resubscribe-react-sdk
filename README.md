# Resubscribe React SDK

The official React SDK for [Resubscribe](https://resubscribe.ai).

## Instructions

Mount the component and then trigger the Resubscribe modal with the `openWithConsent` method. Replace the placeholders with your own values.

```typescript
import Resubscribe from 'resubscribe-react-sdk';

export default function Home() {
  const onTrigger = () => {
    Resubscribe.openWithConsent({
      slug: '{organization-slug}',
      aiType: '{ai-type}>',
      userId: '{uid}',
      colors: {
        primary: 'blue',
        background: '#eee',
        text: '#333',
      },
    });
  };

  return (
    <main>
      ...
      <Resubscribe.Component />
    </main>
  )
}