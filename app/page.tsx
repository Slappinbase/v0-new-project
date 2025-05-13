// app/page// app/page.tsx

export default function Home() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🐸 Meme Slugs is Live</h1>
      <p><a href="/memeslugs">Go to the Game</a></p>
      <p><a href="/memeslugs/submit">Submit a Meme</a></p>
      <p><a href="/memeslugs/gallery">View Gallery</a></p>
    </main>
  );
}
