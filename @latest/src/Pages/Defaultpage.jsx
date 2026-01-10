import DecryptedText from '@/Components/DecryptedText';


function Defaultpage() {
  return (
    <div>
      <h1 className="text-lg font-bold text-center">
        <DecryptedText
          text="Welcome to the Default Page"
          speed={80}
          maxIterations={20}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          animateOn="view"
          sequential={true}
          revealDirection="start"
        />
      </h1>
      <p className="text-center">This is the default landing page of the application.</p>
    </div>
  );
}

export default Defaultpage;