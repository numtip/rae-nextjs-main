import type { DocumentStatus, DocumentVisibility } from "../types";
import type { Locale } from "@/lib/locale";
import { statusLabels, visibilityLabels } from "../labels";

type Props =
  | { kind: "status"; value: DocumentStatus; locale: Locale }
  | { kind: "visibility"; value: DocumentVisibility; locale: Locale };

export default function DocumentBadge(props: Props) {
  if (props.kind === "status") {
    return (
      <span className={`dc-badge dc-badge--status-${props.value}`}>
        {statusLabels[props.locale][props.value]}
      </span>
    );
  }

  return (
    <span className={`dc-badge dc-badge--visibility-${props.value}`}>
      {visibilityLabels[props.locale][props.value]}
    </span>
  );
}
