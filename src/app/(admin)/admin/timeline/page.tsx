import { getTimeline } from "@/lib/dal";
import { updateTimelineAction, addTimelineEventAction, deleteTimelineEventAction } from "@/actions/admin/timeline";
import { TimelineEditor } from "./TimelineEditor";

export default async function TimelinePage() {
  const timeline = await getTimeline();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Firmengeschichte</h1>
        <form action={addTimelineEventAction}>
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors cursor-pointer"
          >
            + Neues Ereignis
          </button>
        </form>
      </div>
      <TimelineEditor
        timeline={timeline}
        updateAction={updateTimelineAction}
        deleteAction={deleteTimelineEventAction}
      />
    </div>
  );
}
