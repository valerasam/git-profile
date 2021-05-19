import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Repository() {
  const { query } = useRouter();
  return (
    <>
      <div>
        <h1>Repository id: {query.id}</h1>
        <Link href={`/repositories`}><a>Back to repositories</a></Link>
      </div>
      <style jsx>
        {`
          h1{
            dispaly: flex;
            justify-content: center;
            font-size: 25px;
            font-weight: 700;
            margin-bottom: 1rem;
            height: 500px;
            color: black;
          }
        `}
      </style>
    </>
  );
}