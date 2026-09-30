/** Menyusun teks pesan WhatsApp untuk pemesanan sebuah paket. */
export function buildPackageMessage(packageName: string) {
  return `Halo, saya ingin memesan catering ${packageName}. Boleh dibantu informasi harga dan ketersediaannya?`
}

export const GENERAL_MESSAGE =
  'Halo, saya ingin bertanya tentang paket catering yang tersedia. Boleh dibantu?'
