import './notFoundPage.css';

export default function NotFoundPage() {

  return (
    <>
      <div className='notfoundpage page bg-light text-dark'>
        <h1>Oops!</h1>
        <p>The page you were looking for does not exist.</p>
        <p>Return to the <a href="/">HomePage &#187;</a></p>
      </div>
    </>
  )
}