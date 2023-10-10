import { useState } from "react";
import Layout from "../components/layout";
import Modal from "../components/modal";

export default function ModalPage() {
  const [shown, setShown] = useState(true);
  return (
    <Layout>
      <button onClick={() => setShown(true)}>Show modal</button>
      <Modal
        shown={shown}
        setShown={setShown}
        heading="BRUH"
        content="yessir :)"
      />
    </Layout>
  );
}
