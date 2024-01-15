"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  showHeader?: boolean;
  handleClose: () => void;
};

export const Base = ({
  title,
  children,
  isOpen,
  showHeader = false,
  handleClose,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            {showHeader && <DialogTitle>{title}</DialogTitle>}
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
