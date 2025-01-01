import { Button } from '@/components/button'
import Link from 'next/link'
import { CardFooter } from '@/components/card-footer'
import { Card } from '@/components/card'
import { Title } from '@/components/title'
import { Image } from '@/components/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

import { ShareButton } from '@/components/share-button'

export const AnimeCard = ({ id, title, imageUrl, rating, episodes, synopsis }: any) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })
  const [isHovered, setIsHovered] = useState(false)
  const imageRef = useRef(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50,
      }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-[200px] object-cover"
        ref={imageRef}
      />
      <Card className="p-4">
        <Title as="h3" className="text-lg font-bold mb-2">
          {title}
        </Title>
        <p className="text-gray-600 text-sm mb-4">
          Rating: {rating} | Episodes: {episodes}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">{synopsis}</p>
        <CardFooter className="flex justify-between">
          <Button asChild className="flex-1 mr-2">
            <Link href={`/anime/${id}`}>View Details</Link>
          </Button>
          <ShareButton title={title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${id}`} />
        </CardFooter>
      </Card>
    </motion.div>
  )
}

