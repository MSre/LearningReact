import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact.js";

export const Route = createLazyFileRoute("/contact")({
  component: ContactComponent,
});

function ContactComponent() {
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input name="email" type="email" placeholder="Email" />
          <textarea name="message" placeholder="Message" />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
