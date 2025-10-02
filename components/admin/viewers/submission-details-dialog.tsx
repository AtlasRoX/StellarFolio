"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ContactSubmission } from "@/lib/db/types"

interface SubmissionDetailsDialogProps {
  submission: ContactSubmission
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function SubmissionDetailsDialog({ submission, isOpen, onOpenChange }: SubmissionDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submission from {submission.name}</DialogTitle>
          <DialogDescription>
            <a href={`mailto:${submission.email}`}>{submission.email}</a>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Subject</h4>
            <p>{submission.subject}</p>
          </div>
          <div>
            <h4 className="font-semibold">Message</h4>
            <p className="whitespace-pre-wrap">{submission.message}</p>
          </div>
          <div>
            <h4 className="font-semibold">Submitted At</h4>
            <p>{new Date(submission.created_at).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
