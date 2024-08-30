import React, { Suspense, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Fox from "../models/Fox";
import UseAlert from "../hooks/UseAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [load, setLoad] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const { alert, showAlert, hideAlert } = UseAlert();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = () => setCurrentAnimation("walk");

  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentAnimation("hit");
    // setLoad(true);
    // emailjs
    //   .send(
    //     import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    //     import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    //     {
    //       from_name: form.name,
    //       to_name: "Raza Naqvi",
    //       from_email: form.email,
    //       to_email: "s16razanaqvi@gmail.com",
    //       message: form.message,
    //     },
    //     import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    //   )
    //   .then(() => {
    setForm({ name: "", email: "", message: "" });
    showAlert({
      show: true,
      text: "Message sent successfully!",
      type: "success",
    });
    setTimeout(() => {
      setCurrentAnimation("idle");
    }, 2000);
    //     setLoad(false);
    //   })
    //   .catch((err) => {
    setTimeout(() => {
      showAlert({
        show: true,
        text: "Something is wrong",
        type: "danger",
      });
    }, 5000);
    //     setCurrentAnimation("idle");
    //     setLoad(false);
    //     console.log("emailjs error", err);
    //   });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleForm}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="John@gmail.com"
              required
              value={form.email}
              onChange={handleForm}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              type="textarea"
              rows={4}
              name="message"
              className="input"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleForm}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={load}
          >
            {load ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <Suspense fallback={<Loader />}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
