import { db } from "@/lib/db/MyDB";

const Popup = () => {
  const { data: submissions, add } = useRepository(db.submissionRepo);
  return (
    <>
      <div>{JSON.stringify(submissions)}</div>
      <button onClick={() => add({ problemId: "1", sheetId: "23", submittedAt: Date.now() })}>Add Sheet</button>
    </>
  )
}

export default Popup
