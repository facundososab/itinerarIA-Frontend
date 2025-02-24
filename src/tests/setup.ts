/// <reference types="vitest" />

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import '@testing-library/jest-dom/vitest';

//Limpio el DOM después de cada test
afterEach(() => {
    cleanup();
});