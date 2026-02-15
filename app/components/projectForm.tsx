import { Form } from "react-router";

interface ProjectData {
  title?: string;
  description?: string;
  image_url?: string;
}

export function ProjectForm({ initialData, isSubmitting }: { initialData?: any, isSubmitting: boolean }) {
  return (
    <Form method="post" encType="multipart/form-data" className="space-y-6">
      {/* Basic Info */}
      <input name="title" defaultValue={initialData?.title} placeholder="Projekt navn" className="block w-full border p-2" />

      {/* Image Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded bg-gray-50">
          <label className="block font-bold mb-2">Før Billede</label>
          {initialData?.before_url && <img src={initialData.before_url} className="h-32 mb-2 object-cover" />}
          <input type="file" name="before_image" accept="image/*" />
        </div>

        <div className="border p-4 rounded bg-gray-50">
          <label className="block font-bold mb-2">Efter Billede</label>
          {initialData?.after_url && <img src={initialData.after_url} className="h-32 mb-2 object-cover" />}
          <input type="file" name="after_image" accept="image/*" />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-6 py-2 rounded">
        {isSubmitting ? "Gemmer..." : "Gem Projekt"}
      </button>
    </Form>
  );
}