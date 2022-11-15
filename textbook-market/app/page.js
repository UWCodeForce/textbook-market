import React from "react";
import clientPromise from "../lib/mongodb"

const mongodb = async () => {
  try {
    await clientPromise

    return {
        props: {
        isConnected: true
      }
    }
  } catch(error) {
    console.log(error)

    return {
      props: {
        isConnected: false
      }
    }
  }
}

export default function Home() {
  return (
    <h1>Welcome to our Textbook Market homepage</h1>
  )
}
