import { useRouter } from 'next/router';

const Unauthorized = () => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>
        You do not have access to the requested
        page.
      </p>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};

export default Unauthorized;
