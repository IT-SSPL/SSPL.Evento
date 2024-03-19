"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className="w-96">
      {props.children}
    </div>
  );
}
