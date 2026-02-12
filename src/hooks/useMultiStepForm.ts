"use client";

import { useState, useCallback } from "react";
import type { z } from "zod/v4";

interface UseMultiStepFormOptions<T> {
  totalSteps: number;
  schemas: z.ZodType[];
  initialData: T;
}

export function useMultiStepForm<T extends object>({
  totalSteps,
  schemas,
  initialData,
}: UseMultiStepFormOptions<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const updateField = useCallback((field: keyof T, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }, []);

  const validateCurrentStep = useCallback(() => {
    const schema = schemas[currentStep];
    if (!schema) return true;

    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    setErrors(fieldErrors);
    return false;
  }, [currentStep, data, schemas]);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
        return true;
      }
    }
    return false;
  }, [validateCurrentStep, currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  }, [currentStep]);

  const complete = useCallback(() => {
    if (validateCurrentStep()) {
      setIsCompleted(true);
      return true;
    }
    return false;
  }, [validateCurrentStep]);

  return {
    currentStep,
    data,
    errors,
    isCompleted,
    updateField,
    nextStep,
    prevStep,
    complete,
    progress: ((currentStep + 1) / totalSteps) * 100,
  };
}
