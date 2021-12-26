import { create } from 'ipfs-http-client'

export const client = () => create('https://ipfs.infura.io:5001/api/v0')