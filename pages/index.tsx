import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { ImportExcel } from '../components/table/ImportExcel'


export default function Home() {
  return (
    <>
      <ImportExcel />
    </>
  )
}
