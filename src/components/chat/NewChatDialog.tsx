import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';

interface NewChatDialogProps {
  open: boolean;
  onClose: () => void;
}

export function NewChatDialog({ open, onClose }: NewChatDialogProps) {
  const [search, setSearch] = useState('');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">New Chat</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by username or phone"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-0"
          />
        </div>
        <div className="py-8 text-center text-muted-foreground">
          <UserPlus className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-sm">Search for users by their @username or phone number</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
