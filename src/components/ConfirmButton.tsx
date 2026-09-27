'use client';
import { useFormStatus } from 'react-dom';

export function ConfirmButton({ children, message, className = 'btn small' }: { children: React.ReactNode; message: string; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button className={className} disabled={pending} onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }}>
      {pending ? 'Working…' : children}
    </button>
  );
}
