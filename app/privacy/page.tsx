export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">

        {/* Header */}
        <header className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-black/50">
            IBIZA ISLANDER
          </p>

          <h1 className="text-4xl font-light tracking-tight md:text-6xl">
            Privacy & Legal
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-black/60">
            Privacy, legal information and terms governing the use of the
            IBIZA ISLANDER website.
          </p>

          <p className="mt-4 text-xs text-black/40">
            Last updated: August 19, 2026
          </p>
        </header>

        {/* Legal Notice */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">1. Legal Notice</h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-black/70">
            <p>
              <strong className="font-medium text-black">
                Website operator
              </strong>
            </p>

            <p>
              IBIZA ISLANDER
              <br />
              {/* TODO: Legal company name */}
              
              <br />
              {/* TODO: Address */}
              
               Vara de Rey,2 Telpost

              <br />
              07800 Ibiza, Spain
            </p>

            <p>
              Email:{' '}
              <a
                href="mailto:hola@ibizaislander.com"
                className="underline underline-offset-4"
              >
                Email
              </a>
            </p>



            <p>
              This website is operated by IBIZA ISLANDER and provides access
              to music, radio programming, editorial content, products,
              services and related activities.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">2. Privacy Policy</h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              IBIZA ISLANDER respects your privacy and is committed to
              protecting your personal data.
            </p>

            <p>
              This Privacy Policy explains what personal information may be
              collected when you use our website, why it is collected, how it
              is used and the rights you may have regarding your personal
              data.
            </p>

            <h3 className="pt-4 text-base font-medium text-black">
              Information we may collect
            </h3>

            <p>
              Depending on how you use the website, we may collect information
              such as your name, email address, account information, shipping
              and billing information, order information and information
              voluntarily provided through forms or DJ submissions.
            </p>

            <p>
              We may also collect certain technical information, such as IP
              address, browser type, device information and information
              relating to your interaction with the website.
            </p>
          </div>
        </section>

        {/* Use of information */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            3. How We Use Your Information
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>Your information may be used to:</p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Create and manage your user account.</li>
              <li>Process and deliver orders.</li>
              <li>Process payments.</li>
              <li>Respond to enquiries and requests.</li>
              <li>Manage music and DJ submissions.</li>
              <li>Operate, maintain and improve the website.</li>
              <li>Protect the security of our services.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>

            <p>
              IBIZA ISLANDER does not sell your personal data to third
              parties.
            </p>
          </div>
        </section>

        {/* Legal basis */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            4. Legal Basis for Processing
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              Where applicable under the General Data Protection Regulation
              (GDPR), personal data may be processed on the basis of your
              consent, the performance of a contract, compliance with a legal
              obligation, or our legitimate interests.
            </p>

            <p>
              Where processing is based on consent, you may withdraw your
              consent at any time.
            </p>
          </div>
        </section>

        {/* Payments */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">5. Payments</h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              Payments made through the IBIZA ISLANDER shop may be processed
              by third-party payment providers, including Stripe.
            </p>

            <p>
              IBIZA ISLANDER does not directly store complete credit or debit
              card numbers. Payment information is processed by the relevant
              payment provider in accordance with its own security and privacy
              policies.
            </p>
          </div>
        </section>

        {/* Cookies */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">6. Cookies</h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              This website may use cookies and similar technologies to ensure
              that the website functions correctly and, where applicable, to
              understand how visitors use our services.
            </p>

            <h3 className="pt-4 text-base font-medium text-black">
              Essential cookies
            </h3>

            <p>
              These cookies or similar technologies may be necessary for
              authentication, account management, shopping cart functionality,
              security and other essential website functions.
            </p>

            <h3 className="pt-4 text-base font-medium text-black">
              Analytics and optional cookies
            </h3>

            <p>
              Where analytics or other non-essential technologies are used,
              they may be activated only where required consent has been
              obtained.
            </p>

            <p>
              You may control or delete cookies through your browser settings.
            </p>
          </div>
        </section>

        {/* Third parties */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            7. Third-Party Services
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              IBIZA ISLANDER may use third-party services to provide certain
              website functions, including hosting, authentication, database
              services, payment processing, audio or radio streaming,
              analytics and embedded or social media content.
            </p>

            <p>
              These providers may process certain information in accordance
              with their own terms and privacy policies.
            </p>
          </div>
        </section>

        {/* DJ submissions */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            8. DJ Submissions & User Content
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              If you submit music, audio recordings, images, information or
              other material through the website, you remain responsible for
              ensuring that you have the necessary rights and permissions to
              submit that material.
            </p>

            <p>
              By submitting content to IBIZA ISLANDER, you authorize IBIZA
              ISLANDER to review and evaluate the submitted material for
              editorial and music-curation purposes.
            </p>

            <p>
              Where submitted material is selected for publication, broadcast
              or other use, the applicable permissions and rights will be
              determined according to the terms communicated to the submitter.
            </p>
          </div>
        </section>

        {/* Intellectual property */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            9. Intellectual Property
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              Unless otherwise stated, the IBIZA ISLANDER name, logo, visual
              identity, website design, original texts, graphics, images,
              photographs, audio content and editorial material are protected
              by applicable intellectual property laws.
            </p>

            <p>
              No content from this website may be reproduced, distributed,
              modified or commercially exploited without prior authorization,
              except where permitted by applicable law.
            </p>
          </div>
        </section>

        {/* Shop */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            10. Online Shop & Orders
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              Product descriptions, photographs, prices and availability are
              provided in good faith and may be updated from time to time.
            </p>

            <p>
              An order is considered accepted once payment has been
              successfully processed and an order confirmation has been sent
              to the customer.
            </p>

            <p>
              Shipping, returns and refunds are subject to the policies
              applicable to the relevant purchase and to mandatory consumer
              rights under applicable law.
            </p>
          </div>
        </section>

        {/* User rights */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            11. Your Data Protection Rights
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              Subject to applicable law, you may have the right to:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Access your personal data.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>Request deletion of your personal data.</li>
              <li>Request restriction of certain processing.</li>
              <li>Object to certain processing activities.</li>
              <li>Request portability of your personal data.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>

            <p>
              To exercise your rights, please contact us at:
            </p>

            <p>
              <a
                href="mailto:hola@ibizaislander.com"
                className="underline underline-offset-4 text-black"
              >
                [EMAIL]
              </a>
            </p>

            <p>
              You may also have the right to lodge a complaint with the
              competent data protection authority.
            </p>
          </div>
        </section>

        {/* Data retention */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            12. Data Retention
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              We retain personal information only for as long as necessary
              for the purposes for which it was collected, including where
              necessary to comply with legal, accounting, contractual or
              regulatory obligations.
            </p>

            <p>
              When information is no longer required, it may be securely
              deleted or anonymized.
            </p>
          </div>
        </section>

        {/* Security */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            13. Data Security
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              We take reasonable technical and organizational measures to
              protect personal information against unauthorized access,
              accidental loss, alteration or disclosure.
            </p>

            <p>
              However, no internet transmission or electronic storage system
              can be guaranteed to be completely secure.
            </p>
          </div>
        </section>

        {/* Terms */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            14. Terms & Conditions
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              By using the IBIZA ISLANDER website, you agree to use the
              website lawfully and in a manner that does not infringe the
              rights of IBIZA ISLANDER or third parties.
            </p>

            <p>
              We reserve the right to modify, suspend or discontinue any part
              of the website or its services where reasonably necessary.
            </p>

            <p>
              Product purchases are also subject to the applicable consumer
              protection and e-commerce laws.
            </p>
          </div>
        </section>

        {/* Liability */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            15. Website Availability & Liability
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              We take reasonable measures to maintain the availability and
              proper functioning of the website. However, we cannot guarantee
              uninterrupted access or that the website will always be free
              from errors, interruptions or technical issues.
            </p>

            <p>
              Nothing in these terms excludes or limits liability where such
              exclusion or limitation is not permitted by applicable law.
            </p>
          </div>
        </section>

        {/* Changes */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            16. Changes to This Policy
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-black/70">
            <p>
              IBIZA ISLANDER may update this Privacy & Legal page from time
              to time.
            </p>

            <p>
              The latest version will always be available on this page,
              together with the date of the most recent update.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-black/10 py-10">
          <h2 className="text-2xl font-light">
            17. Contact
          </h2>

          <div className="mt-6 text-sm leading-7 text-black/70">
            <p>
              For questions regarding privacy, legal matters, orders or the
              use of this website, please contact:
            </p>

            <p className="mt-5">
              <strong className="font-medium text-black">
                IBIZA ISLANDER
              </strong>
              
                Vara de Rey,2 Telpost

              <br />
              07800 Ibiza, Spain
            </p>

            <p className="mt-5">
              <a
                href="mailto:hola@ibizaislander.com"
                className="underline underline-offset-4 text-black"
              >
                [EMAIL]
              </a>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-black/10 pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            © {new Date().getFullYear()} IBIZA ISLANDER
          </p>
        </footer>

      </div>
    </main>
  )
}