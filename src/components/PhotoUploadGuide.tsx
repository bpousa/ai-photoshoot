export function PhotoUploadGuide() {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 space-y-4">
      <h3 className="font-semibold text-lg">Photo Requirements</h3>
      
      <div className="space-y-2">
        <p className="font-medium">Required Photos (Minimum 8, Best 12-15):</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><span className="font-medium">Face Shots (4-5):</span> Close-ups from different angles</li>
          <li><span className="font-medium">Upper Body (3-4):</span> Mix of formal/casual attire</li>
          <li><span className="font-medium">Full Body (2-3):</span> Different poses and settings</li>
        </ul>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Photo Guidelines:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Good lighting (natural light preferred)</li>
          <li>Clear, uncluttered backgrounds</li>
          <li>Sharp focus, no filters</li>
          <li>High resolution (1024x1024 minimum)</li>
          <li>Mix of indoor/outdoor settings</li>
        </ul>
      </div>

      <p className="text-sm text-blue-600">
        Following these guidelines will help create the best possible results!
      </p>
    </div>
  );
}