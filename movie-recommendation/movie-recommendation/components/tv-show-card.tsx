import { Button } from '@/components/button'
import Link from 'next/link'
import { CardFooter } from '@/components/card-footer'
import { Card } from '@/components/card'
import { Title } from '@/components/title'
import { Image } from '@/components/image'
import { type TVShow } from '@/types/tv-show'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useFetch } from '@/hooks/use-fetch'
import { Loading } from '@/components/loading'
import { Error } from '@/components/error'
import { type ErrorResponse } from '@/types/error-response'
import { useSearchParams } from '@/hooks/use-search-params'
import { useDebounce } from '@/hooks/use-debounce'
import { SearchBar } from '@/components/search-bar'
import { Pagination } from '@/components/pagination'
import { type PaginationProps } from '@/components/pagination'
import { useInView } from 'react-intersection-observer'
import { type RefObject } from 'react'
import { type TVShowResponse } from '@/types/tv-show-response'

import { ShareButton } from '@/components/share-button'


const TvShows = () => {
  const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query, 500)
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10))
  const { data, loading, error } = useFetch<TVShowResponse>(`/api/tv-shows?q=${debouncedQuery}&page=${page}`)
  const [ref, inView] = useInView()

  useEffect(() => {
    const handleRouteChange = () => {
      const newSearchParams = new URLSearchParams(router.asPath.split('?')[1] || '')
      setQuery(newSearchParams.get('q') || '')
      setPage(parseInt(newSearchParams.get('page') || '1', 10))
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  useEffect(() => {
    if (inView && data?.page < data?.totalPages) {
      setPage(page + 1)
    }
  }, [inView, data?.page, data?.totalPages, page])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    router.push({ pathname: '/', query: { q: e.target.value, page: 1 } }, undefined, { shallow: true })
  }

  const handlePageChange = (page: number) => {
    setPage(page)
    router.push({ pathname: '/', query: { q: query, page } }, undefined, { shallow: true })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={(error as ErrorResponse).message} />
  }

  return (
    <>
      <SearchBar value={query} onChange={handleSearch} />
      {data?.results.map((tvShow: TVShow) => (
        <Card key={tvShow.id}>
          <Image src={tvShow.image} alt={tvShow.title} />
          <Title>{tvShow.title}</Title>
          <CardFooter className="flex justify-between">
            <Button asChild className="flex-1 mr-2">
              <Link href={`/tv-show/${tvShow.id}`}>View Details</Link>
            </Button>
            <ShareButton title={tvShow.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/tv-show/${tvShow.id}`} />
          </CardFooter>
        </Card>
      ))}
      <Pagination {...{ page, totalPages: data?.totalPages, onChange: handlePageChange }} ref={ref} />
    </>
  )
}

export default TvShows

