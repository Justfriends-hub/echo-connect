import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (content: string) => void;
  onTyping?: () => void;
  disabled?: boolean;
  placeholder?: string;
  floating?: boolean;
}

export function ChatInput({ onSend, onTyping, disabled, placeholder = "Message", floating = true }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  useEffect(() => {
    if (!floating) return;
    const update = () => {
      if (typeof window === 'undefined') return;
      const vv = (window as any).visualViewport;
      if (vv) {
        const offset = Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0));
        setKeyboardOffset(offset);
      } else {
        setKeyboardOffset(0);
      }
    };
    update();
    const vv = (window as any).visualViewport;
    if (vv) {
      // update container height css variable so chat area can add padding
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight || 0;
        try {
          document.documentElement.style.setProperty('--chat-input-height', `${h}px`);
        } catch (e) {}
      }
      vv.addEventListener('resize', update);
      vv.addEventListener('scroll', update);
    } else {
      window.addEventListener('resize', update);
    }
    window.addEventListener('orientationchange', update);
    return () => {
      if (vv) {
        vv.removeEventListener('resize', update);
        vv.removeEventListener('scroll', update);
      } else {
        window.removeEventListener('resize', update);
      }
      window.removeEventListener('orientationchange', update);
    };
  }, [floating]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTyping?.();
  };

  const floatingStyle: React.CSSProperties | undefined = floating
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: `calc(${keyboardOffset}px + env(safe-area-inset-bottom))`,
        zIndex: 9999,
      }
    : undefined;

  return (
    <div style={floatingStyle} className="flex items-end gap-2 p-3 bg-chat-input-bg border-t border-border">
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex-shrink-0 mb-0.5">
        <Paperclip className="w-5 h-5" />
  const inner = (
    <div ref={containerRef} style={floatingStyle} className="flex items-end gap-2 p-3 bg-chat-input-bg border-t border-border">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={() => onTyping?.()}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          className={cn(
            "w-full resize-none bg-secondary rounded-2xl px-4 py-2.5 text-sm text-foreground",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            "max-h-[120px] transition-colors"
          )}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 bottom-0.5 text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <Smile className="w-5 h-5" />
        </Button>
      </div>
      {text.trim() ? (
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-primary hover:bg-primary/90 rounded-full flex-shrink-0 mb-0.5 w-10 h-10"
          disabled={disabled}
        >
          <Send className="w-4 h-4" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex-shrink-0 mb-0.5">
          <Mic className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
