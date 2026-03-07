"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  type MutableRefObject,
} from "react";
import type { Project } from "@/lib/data";

interface CaseStudyModalState {
  isOpen: boolean;
  project: Project | null;
}

type CaseStudyModalAction =
  | { type: "OPEN"; project: Project }
  | { type: "CLOSE" };

interface CaseStudyModalContextValue extends CaseStudyModalState {
  openModal: (project: Project, trigger?: HTMLElement | null) => void;
  closeModal: () => void;
  lastTriggerRef: MutableRefObject<HTMLElement | null>;
}

const initialState: CaseStudyModalState = {
  isOpen: false,
  project: null,
};

const CaseStudyModalContext =
  createContext<CaseStudyModalContextValue | null>(null);

const CaseStudyModal = dynamic(
  () =>
    import("@/components/ui/CaseStudyModal").then(
      (mod) => mod.CaseStudyModal,
    ),
  { ssr: false },
);

function reducer(
  state: CaseStudyModalState,
  action: CaseStudyModalAction,
): CaseStudyModalState {
  if (action.type === "OPEN") {
    return { isOpen: true, project: action.project };
  }
  return { isOpen: false, project: null };
}

export function CaseStudyModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(
    (project: Project, trigger?: HTMLElement | null) => {
      if (trigger) {
        lastTriggerRef.current = trigger;
      } else if (document.activeElement instanceof HTMLElement) {
        lastTriggerRef.current = document.activeElement;
      }

      dispatch({ type: "OPEN", project });
    },
    [],
  );

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, []);

  const value = useMemo(
    () => ({
      isOpen: state.isOpen,
      project: state.project,
      openModal,
      closeModal,
      lastTriggerRef,
    }),
    [closeModal, openModal, state.isOpen, state.project],
  );

  return (
    <CaseStudyModalContext.Provider value={value}>
      {children}
      <CaseStudyModal />
    </CaseStudyModalContext.Provider>
  );
}

export function useCaseStudyModal() {
  const context = useContext(CaseStudyModalContext);

  if (!context) {
    throw new Error(
      "useCaseStudyModal must be used within CaseStudyModalProvider",
    );
  }

  return context;
}
