import { useState, useEffect } from "react"
import { generateProof } from "../lib/zk/generateProof"
import { buildPoseidon } from "circomlibjs"

export default function Home() {
  const [secret, setSecret] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    try{
      setLoading(true)

      const { proof, publicSignals } = await generateProof(secret)

      console.log("PROOF:", JSON.stringify(proof))
      console.log("PUBLIC SIGNALS:", JSON.stringify(publicSignals))
      alert("Proof generated! check console")
    }catch(err){
      console.error(err)
    }
    setLoading(false)
  }

// const generateTest = async () => {
//   const poseidon = await buildPoseidon()

//   const testSecret = BigInt("123456789")
//   const hashValue = poseidon([testSecret])
//   const hash = poseidon.F.toString(hashValue)

//   console.log("TEST HASH:", hash)
// }

//   useEffect(()=>{
//     generateTest()
//   },[])

  return (
    <div style={{padding:"40px"}}>
      <h2>ZK Identity Login</h2>
      <input
        type="text"
        placeholder="enter secret"
        value={secret}
        onChange={(e)=>setSecret(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Proof"}
      </button>
    </div>
  )
}