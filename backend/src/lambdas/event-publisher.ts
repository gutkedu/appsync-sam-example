interface EventPayload {
    eventType: string;
    channel: string;
    data: any;
}

export const eventPublisherHandler = async (event: EventPayload) => {
    const endpoint = process.env.EVENT_API_ENDPOINT;
    const apiKey = process.env.EVENT_API_KEY;

    if (!endpoint) {
        throw new Error('EVENT_API_ENDPOINT environment variable is not set');
    }
    if (!apiKey) {
        throw new Error('EVENT_API_KEY environment variable is not set');
    }

    const eventData = {
        eventType: event.eventType,
        ...event.data,
    };

    const payload = {
        channel: event.channel,
        events: [JSON.stringify(eventData)],
    };

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Event API responded with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('Event published successfully:', result);
        return { success: true, result };
    } catch (err) {
        console.error('Failed to publish event to Event API:', err);
        throw err;
    }
};
