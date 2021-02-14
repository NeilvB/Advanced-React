import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <div>
        <h2>Page Component</h2>
        {children}
      </div>{' '}
    </>
  );
}
