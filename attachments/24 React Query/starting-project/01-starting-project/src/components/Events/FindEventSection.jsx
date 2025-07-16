import { useRef, useState } from 'react';
import { fetchEvents } from '../util/http';
import { useQuery } from '@tanstack/react-query';
import ErrorBlock from '../UI/ErrorBlock';
import LoadingIndicator from '../UI/LoadingIndicator';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchValue, setSearchValue] = useState('')

  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['events', {'search': searchValue}],
    queryFn: () => fetchEvents(searchValue),
    enabled: searchValue.trim().length > 0
  })

  function handleSubmit(event) {
    event.preventDefault();
    setSearchValue(searchElement.current.value)
  }

  let content = <p>Please enter a search term and to find events.</p>

  if (isError) {
    content = <ErrorBlock title="Error fetching data" message={error.info?.message}/>
  }

  if (isLoading) {
    content = <LoadingIndicator />
  }

  if (data) {
    content = <ul className='events-list'>
      {data.map((event) => (
        <li key={event.id}>
          <EventItem event={event} />
        </li>)
      )}
    </ul>
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
