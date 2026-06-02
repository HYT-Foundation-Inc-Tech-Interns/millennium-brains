import Galaxy from '../components/site/Galaxy';

export function GalaxyDemo() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Galaxy />
    </div>
  );
}

export function GalaxyCustom() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
      />
    </div>
  );
}
