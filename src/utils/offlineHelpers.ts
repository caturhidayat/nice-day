/*
 * Modul offlineHelpers menyediakan dua fungsi:
 * 1. registerServiceWorker: Untuk mendaftarkan service worker yang bertugas meng-cache sumber daya agar aplikasi dapat bekerja offline.
 * 2. saveAttendanceOffline: Untuk menyimpan data ke penyimpanan lokal (dalam contoh ini menggunakan IndexedDB) saat offline,
 *    sehingga data dapat disinkronkan dengan server ketika koneksi kembali tersedia.
 *
 * NOTE: Implementasi ini merupakan contoh sederhana. Untuk aplikasi produksi, sebaiknya menggunakan solusi yang lebih robust
 * seperti IndexedDB atau library seperti localForage untuk manajemen data offline.
 */

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('attendanceDB', 1);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('attendances')) {
        db.createObjectStore('attendances', { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

function sanitizeData(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker terdaftar dengan sukses:', registration);
        })
        .catch(error => {
          console.error('Pendaftaran Service Worker gagal:', error);
        });
    });
  } else {
    console.warn('Service Worker tidak didukung oleh browser ini.');
  }
}

export function saveAttendanceOffline(attendanceData: any): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction('attendances', 'readwrite');
      const store = transaction.objectStore('attendances');
      // Sanitasi data sebelum menyimpan ke IndexedDB
      const sanitizedData = sanitizeData(attendanceData);
      const request = store.add(sanitizedData);
      request.onsuccess = () => {
        console.log('Data kehadiran disimpan secara offline menggunakan IndexedDB:', sanitizedData);
        resolve();
      };
      request.onerror = () => {
        console.error('Gagal menyimpan data kehadiran secara offline:', request.error);
        reject(request.error);
      };
    } catch (err) {
      console.error('Error saat membuka database IndexedDB:', err);
      reject(err);
    }
  });
}
