import React from 'react';
import { MessageCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full chat-bg text-muted-foreground">
      <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
        <MessageCircle className="w-10 h-10 text-primary/40" />
      </div>
      <h2 className="text-lg font-medium text-foreground/60">Select a chat to start messaging</h2>
      <p className="text-sm mt-2 text-muted-foreground/70">Choose from your existing conversations or start a new one</p>
    </div>
  );
}
