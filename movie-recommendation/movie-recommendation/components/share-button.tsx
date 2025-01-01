'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const shareUrl = async (platform: string) => {
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        break
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: 'Link copied',
        description: 'The link has been copied to your clipboard.',
      })
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again.',
        variant: 'destructive',
      })
    }
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => shareUrl('twitter')}>
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => shareUrl('facebook')}>
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => shareUrl('linkedin')}>
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={copyToClipboard}>
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

