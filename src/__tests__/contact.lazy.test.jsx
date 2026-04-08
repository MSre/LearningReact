import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient({});

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const msgInput = screen.getByPlaceholderText("Message");

  const testData = {
    name: "nameTest",
    email: "test@example.com",
    message: "Hello world!",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgInput.value = testData.message;

  const btn = screen.getByRole("button");
  btn.click();

  // const h3 = await screen.findByRole("heading", { level: 3 });
  // expect(h3.innerText).toContain("Submitted");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("/api/contact");
  expect(requests[0].method).toEqual("POST");
  expect(fetchMocker).toHaveBeenNthCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: { "content-type": "application/json" },
  });
});
