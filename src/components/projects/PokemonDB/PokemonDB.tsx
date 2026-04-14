export default function PokemonDB() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      paddingTop: '80px',
      backgroundColor: '#f5f2ec'
    }}>
      <iframe
        src="https://aebens.github.io/PokemonDB/#/"
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          backgroundColor: 'white'
        }}
        title="Pokémon Database"
        allow="fullscreen"
      />
    </div>
  );
}
