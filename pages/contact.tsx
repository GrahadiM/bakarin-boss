import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Contact: NextPageWithLayout = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const toko = "Bakarin Boss";
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;
    const description = e.target.elements.description.value;

    // Link WhatsApp
    const whatsappLink = `https://wa.me/6285767113554?text=Halo%20${toko},%20saya%20${name}%0AEmail%3A%20${email}%0ANomor%20Telepon%3A%20${phone}%0ADeskripsi%3A%20${description}`;

    // Open new tab for link WhatsApp
    window.open(whatsappLink, "_blank");
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2>
        <span>Kontak</span> Kami
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, tempore.
      </p>

      <div className={styles.row}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7897278742453!2d106.8829223763819!3d-6.158910293828278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5ca5fa65ff1%3A0xafe23d29167e2e69!2sBakarin%20Boss!5e0!3m2!1sid!2sid!4v1699441826589!5m2!1sid!2sid"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className={styles.map}
        ></iframe>

        <form onSubmit={handleSubmit}>
          <div className={styles.input_grup}>
            <FontAwesomeIcon icon={faUser} />
            <input type="text" name="name" placeholder="Nama" required />
          </div>
          <div className={styles.input_grup}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className={styles.input_grup}>
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="number"
              name="phone"
              placeholder="Nomor WhatsApp"
              required
            />
          </div>
          <div className={styles.input_grup}>
            <FontAwesomeIcon icon={faList} />
            <input
              type="text"
              name="description"
              placeholder="Deskripsi"
              required
            />
          </div>
          <button type="submit" className={styles.btn}>
            Kirim Pesan
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

Contact.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
