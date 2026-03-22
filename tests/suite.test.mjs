import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ─── Stable tests (always pass) ───────────────────────────────

describe("Math operations", () => {
  it("adds two numbers", () => {
    assert.equal(1 + 2, 3);
  });

  it("multiplies two numbers", () => {
    assert.equal(3 * 4, 12);
  });

  it("handles negative numbers", () => {
    assert.equal(-1 + -2, -3);
  });
});

describe("String operations", () => {
  it("concatenates strings", () => {
    assert.equal("hello" + " " + "world", "hello world");
  });

  it("converts to uppercase", () => {
    assert.equal("kleore".toUpperCase(), "KLEORE");
  });

  it("trims whitespace", () => {
    assert.equal("  test  ".trim(), "test");
  });
});

describe("Array operations", () => {
  it("filters values", () => {
    assert.deepEqual([1, 2, 3, 4].filter((n) => n > 2), [3, 4]);
  });
});

// ─── Mock payment gateway service ────────────────────────────

const mockPaymentGateway = {
  connect: () => Promise.resolve({ status: "connected" }),
};

// ─── Flaky tests (~30% failure rate) ──────────────────────────

describe("External service integration", () => {
  it("connects to payment gateway", async () => {
    const result = await mockPaymentGateway.connect();
    assert.equal(result.status, "connected");
  });

  it("syncs user profile from auth service", () => {
    // Simulates occasional auth token expiry race condition
    if (Math.random() < 0.3) {
      throw new Error("TokenExpiredError: auth token expired during sync");
    }
    assert.ok(true);
  });

  it("writes analytics event to queue", () => {
    // Simulates intermittent queue backpressure
    if (Math.random() < 0.3) {
      throw new Error("QueueFullError: analytics queue at capacity, event dropped");
    }
    assert.ok(true);
  });
});