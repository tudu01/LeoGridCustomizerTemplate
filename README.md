# Leo Grid Customizer Template

A Power Apps Component Framework (PCF) grid customizer template for the modern Power Apps grid. It provides hooks to override cell rendering and editing for model-driven app grids.

## Features
- Namespace: `leovia`
- Control: `PAGridCustomizer`
- Logical name: `leovia_leovia.PAGridCustomizer`
- Managed solution: `DOT003 Control` (unique name `leovia_DOT003Control`)
- Sample overrides included for `Text` columns:
  - Render: values longer than 10 chars in crimson and bold
  - Editor: simple text input that updates cell value

## Prerequisites
- Node.js LTS and npm
- Microsoft Power Platform CLI (`pac`)
- .NET SDK 8/9 (for building the solution project)

Verify tools:
```bash
node -v
pac --help | head -n 1 | cat
dotnet --version
```

## Install
```bash
npm install
```

## Build the PCF control (standalone)
```bash
npm run build
```

## Package into a managed solution (ZIP)
This repo already contains a Dataverse solution project in `solution/` which references the PCF project.

Build the managed solution ZIP:
```bash
cd solution
dotnet build /p:Configuration=Release | cat
cd ..
```
Artifacts:
- Managed ZIP: `solution/bin/Release/solution.zip`
- Copied convenience path: `bin/Managed/DOT003_Control_managed.zip`

## Import into your environment
- Maker portal: Solutions → Import → select `bin/Managed/DOT003_Control_managed.zip` → Import
- Or CLI:
```bash
pac solution import --path ./bin/Managed/DOT003_Control_managed.zip
```

## Configure on a main table view (modern Power Apps grid)
Attach the customizer directly to the view’s grid (no form needed):
1. Maker portal → Tables → Views → open your view (ensure it uses the modern Power Apps grid).
2. In grid properties:
   - Set the Customizer control to: `leovia_leovia.PAGridCustomizer`.
   - Set the grid’s Customizer event name (or Grid customizer event name) to a string, e.g., `leoviaGrid`.
3. In the component properties for `leovia.PAGridCustomizer` (same panel), set `EventName` to the exact same value: `leoviaGrid`.
4. Save and publish.

After publishing, open the main view. For Text columns, values longer than 10 characters render in crimson/bold; editing shows a simple input.

## Where to customize
- Cell renderers: `PAGridCustomizer/customizers/CellRendererOverrides.tsx`
- Cell editors: `PAGridCustomizer/customizers/CellEditorOverrides.tsx`
- Types/interfaces: `PAGridCustomizer/types.ts`
- Control entry: `PAGridCustomizer/index.ts`
- Manifest: `PAGridCustomizer/ControlManifest.Input.xml`

Example (Text renderer):
```tsx
export const cellRendererOverrides: CellRendererOverrides = {
    Text: (props) => {
        const safeToString = (v: unknown) => (typeof v === "string" || typeof v === "number" || typeof v === "boolean") ? String(v) : "";
        const text = safeToString((props as any).formattedValue) || safeToString((props as any).value);
        const style = text.length > 10 ? { color: "crimson", fontWeight: 600 } : undefined;
        return <span style={style}>{text}</span>;
    },
};
```

## Versioning
- Current solution version: `1.0.1.0`
- Update version in `solution/src/Other/Solution.xml` (`<Version>`) and rebuild to produce an upgradeable ZIP.

## Troubleshooting
- Solution ZIP has no control:
  - Build the solution project (not just `npm run build`): `cd solution && dotnet build /p:Configuration=Release`
- ESLint errors during build:
  - Follow messages and ensure safe string conversions for non-primitive values; avoid prop-types warnings by using typed props.
- Import blocked:
  - Ensure permissions and that you’re importing the Managed ZIP.

## References
- Microsoft docs – Customize the editable grid control: [link](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/customize-editable-grid-control)

## License
MIT (or your preferred license)
