import React, { Component } from "react";
import classnames from "classnames";
import withCustomStyles from "./TermsPage.style";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SEOInfoPart from "../parts/SEOInfoPart";
import RobotsNoIndexPart from "../parts/RobotsNoIndexPart";

class TermsPage extends Component {
  render() {
    const {
      props: { classes }
    } = this;

    return (
      <Paper>
        <SEOInfoPart />
        <RobotsNoIndexPart />
        <Typography
          variant="h5"
          className={classnames(classes.gutterBottom2, classes.termsTitle)}
        >
          Welcome to GrocerApp!
        </Typography>
        <Typography variant="body2">
          Here you can find all the terms and conditions that we apply in order
          to perform our provided services at the highest level of our
          standards. If you’re here, that means you’re smart enough to read them
          carefully before using our services. PLEASE READ THE FOLLOWING TERMS
          AND CONDITIONS CAREFULLY. THEY CONTAIN IMPORTANT INFORMATION ABOUT
          YOUR RIGHTS AND OBLIGATIONS, AS WELL AS LIMITATIONS AND EXCLUSIONS
          THAT APPLY TO YOUR PURCHASES. GENERAL SCOPE GrocerApp provides
          software-based delivery services for goods such as food, beverages and
          other grocery products (collectively, Groceries). These terms (Terms
          of Service) apply when you use the GrocerApp mobile applications or
          websites (collectively, Services).The Services are restricted to the
          selected territory of Pakistan. By using the Services, you
          automatically agree to the Terms of Service. GrocerApp is a platform
          for facilitating the exchange of services between individuals (User)
          who are willing to order Groceries via our partners (Shops) that are
          willing to collect and deliver the ordered Groceries. REGISTRATION and
          ORDERING PROCESS 2.1. Registration You are the sole authorized User of
          any account (Account) you create using the Services. Your action of
          registration constitutes your acceptance of the Terms of Service and
          the Privacy Policy, and your state that you are not less than 18
          (eighteen) years of age. Registration is free of charge. No
          entitlement exists for admission to the Service. The data required for
          registration provided by the User must be complete and accurate. The
          User is responsible for updating his/her own data that can be amended
          at any time from the respective interface of the Service. GrocerApp
          has no responsibility over the use of the User account and expressly
          disclaims any liability therefrom. Should you suspect that any
          unauthorized party might be using your Account, you are obligated for
          your own security to notify GrocerApp immediately by emailing us at
          info@grocerapps.com. By providing your mobile phone number to
          GrocerApp pursuant to the use of the Service, you hereby affirmatively
          consent to our use of your mobile phone number for contacting you
          directly in order to perform the Services, including but not limited
          to occasionally send notifications, text messages with promotional
          offers, service updates and reach out to you to survey regarding the
          quality of our services 2.2. Order placement / contractual
          relationship By placing an order, the User confirms the accuracy of
          all the information he/she provides. Orders are confirmed to the User
          within Service interface. No contractual relationship exists between
          User and GrocerApp. GrocerApp may decide for any reason whatsoever to
          not accept an order and to refuse to perform it. User may schedule the
          order for a selected time, date, week or month as per availability of
          Service. 2.3. Variety limitations The range and prices of Groceries
          may differ depending on the delivery location. 2.4. Volume limitations
          User might be contacted by GrocerApp to confirm the order in the
          following cases: If the total items in an order exceed 100 items or if
          an order contains 25 or more same items If the order placed requires
          more than one delivery personnel to be handled by due to volume
          limitations. In all cases, GrocerApp reserves the right to limit the
          delivery quantity for particular products or, if needed, not to
          deliver a particular product at all as per the availability of the
          Groceries. 2.5. Amending and cancelling orders The User may not be
          able to amend the order once it has been confirmed as per the
          technical features provided by the Service. A confirmed order is
          eligible for cancellation for a limited time period until it is
          disbursed for delivery post to its submission as per the technical
          specifications of the Service. 2.6. Incomplete order fulfillment /
          Substitution The primary objective of GrocerApp is to deliver all the
          products ordered in the right quantity and to a high quality standard.
          User acknowledges that the Groceries are subject to stock availability
          and to human errors. GrocerApp reserves the right to amend your order
          in whole or in part, at any time and without liability or compensation
          remove any item that is out of stock, damaged, spoiled, or unavailable
          for any other reason, to successfully complete your order. It’s in our
          best intention to maintain the replaced item’s price the same as per
          the brand you ordered but in case of a higher valued replacement, the
          price may increase. We do our best to ensure that all items shown on
          our website are available to order. If however any product you order
          is out of stock or unavailable we may send you a push notification
          enabling you to select a substitute. If an item is not delivered,
          despite being billed, the amount in question will be credited to the
          User at a reasonable time after GrocerApp becomes aware of this. No
          subsequent delivery is obligatory to be made, and the customer is not
          entitled to claim any further compensation. If for any reason beyond
          our reasonable control, we are unable to supply a particular item, we
          will not be liable to the User. Please note that we will attempt to
          deliver substitute products in the event that selected products are
          unavailable, the User may reject these substitutes upon receiving the
          Groceries. Although we will always try to cater for your orders, an
          order of unusually large quantities of different or one product can
          only be fulfilled at the discretion of the Shop. DELIVERY 3.1.
          Delivery of Groceries Groceries will be delivered directly to the
          delivery address specified by the User. Deliveries are performed
          either by the Shop personal delivery service or by a delivery partner,
          depending on the nature of the goods and the delivery location. Goods
          will be delivered to the front door of private residences (as far as
          accessible) and to the the reception desk of business Users. 3.2.
          Delivery times and adherence to delivery periods GrocerApp endeavors
          to deliver Groceries within 60 (thirty) to 90 (Ninety) minutes average
          delivery time location dependant or as scheduled. GrocerApp does not
          and cannot guarantee that the delivery time frames will be met as
          there may be factors outside of GrocerApp&apos;s control that may
          result in early or delayed deliveries. You agree that GrocerApp shall
          not be liable for any deliveries made outside the expected delivery
          time frame. 3.3. Delivery receipt After you have placed your order and
          the Shop has prepared all the items, we will send you an sms with the
          link to your electronic receipt whenever technologically possible. The
          receipt is intended to include the final items for which you are
          requested to pay. The customer may receive a physical copy as well
          after such a receipt is requested. 3.4. Cancellation of a delivery by
          GrocerApp If, for reasons beyond GrocerApp&apos;s control - such as an
          incorrect delivery address, the recipient&apos;s absence, lack of an
          access permit, bad weather conditions, or similar, it should prove
          impossible or possible only with great difficulty, to carry-out the
          delivery successfully, GrocerApp is entitled to cancel the User’s
          order. In this event, the User is not entitled to compensation or
          pecuniary of in kind. PRICES AND PAYMENT GrocerApp endeavours to
          provide you with accurate and up-to-date pricing, product availability
          and promotional information. Discrepancies are possible and you agree
          not to hold GrocerApp liable in such instances. 4.1. Prices All prices
          are quoted in PAKISTAN Ruppee. Where goods may be charged by weight
          (fruit, meat, cheese, etc.), the basic price per unit applies. The
          quantity of such goods actually delivered, and therefore the price
          charged, may differ from the quantity originally ordered. For
          prepacked and price-labelled fresh products, the applicable price is
          the one in force when the order is prepared. GrocerApp reserve the
          right to change prices as to update them at any moment. 4.2. Payment
          methods / creditworthiness You can choose from the following ways of
          paying on delivery, depending on the products and the means of
          dispatch and as per technical availability: Cash on delivery Any
          dispute or claim arising out of or in connection with this website
          shall be governed and construed in accordance with the laws of
          Pakistan. Pakistan is our country of domicile. Minors under the age of
          18 shall are prohibited to register as a User of this website and are
          not allowed to transact or use the website. If you make a payment for
          our products or services on our website, the details you are asked to
          submit will be provided directly to our payment provider via a secured
          connection. The cardholder must retain a copy of transaction records
          and Merchant policies and rules. The User can select which payment
          method is prefered. The payment methods available are displayed for
          selection when the order is finalized. If for any reasons it is
          impossible to perform the payment with credit card, GrocerApp is
          entitled to offer the User the only cash on delivery payment option.
          PRODUCT DECLARATION 5.1. Product information We take care to update
          the product information in the Service regularly. In rare cases, the
          information may deviate from the details printed on the product
          packaging. In such an instance, the information on the packaging takes
          precedence. Because recipes may change anytime, we recommend that you
          regularly consult the ingredients list and allergy-related information
          on the packaging. GUARANTEE of DATA COMMUNICATION Given the current
          state of the technology, no guarantee can be given that data
          communication via the internet will be error-free and/or available at
          all times. GrocerApp therefore accepts no liability in respect of the
          constant, uninterrupted availability of the online shop, nor for
          technical and electronic faults during a sales transaction, in
          particular for any delay in processing or accepting orders. SPECIAL
          PRODUCT CONDITIONS 7.1. Prepay mobile phone credit GrocerApp sells
          mobile phone cards of various providers as for example: Mobilink, Zong
          & Warid. Mobile phone cards should be activated as soon as possible.
          The activation code is valid only once. No exchanges or refunds are
          permitted. DISCOUNTS, PRIVILEGES & VOUCHERS 8.1. Special offers The
          User accepts that offers available from GrocerApp often differ from
          those available from Shop sales channels. 8.2. Loyalty bonuses
          GrocerApp may award loyalty bonuses in a form solely decided by
          GrocerApp and may withdraw loyalty bonuses at any point and without
          warning or liability CUSTOMER SERVICE & COMPLAINTS GrocerApp Customer
          Service provides information and personal advice regarding any
          questions, problems or complaints about GrocerApp services. E-mail:
          info@grocerapps.com Missing items must be reported immediately on
          reception of the Groceries, otherwise Groceries are considered to have
          been accepted by User as being in perfect condition. Latent defects
          must be reported to GrocerApp Customer Service immediately after they
          come to light, although in these cases there are limitations of error
          acknowledgement. GENERAL TERMS 10.1. Data protection Data collected
          are treated as confidential and in good faith. When registration is
          made, your data is collected for business and marketing purposes in
          the form of personal information such as last name, first name,
          address, email address and phone number. In addition to data
          explicitly entered, information is gathered automatically from the log
          files when you access the Services interface. GrocerApp makes a
          distinction between master data (e.g. IP address, time and date of
          access) and activity data (e.g. name of file accessed, paths clicked
          on). For statistical purposes, this data is anonymously assessed.
          10.2. Release YOU AGREE THAT NEITHER GROCERAPP NOR ITS AFFILIATES OR
          LICENSORS ARE RESPONSIBLE FOR THE FITNESS OR CONDUCT OF ANY Shop.
          NEITHER GROCERAPP NOR ITS AFFILIATES OR LICENSORS WILL BE LIABLE FOR
          ANY CLAIM, INJURY OR DAMAGE ARISING IN CONNECTION WITH THE ACTS OR
          OMISSIONS OF ANY Shop. IN THE EVENT YOU HAVE A DISPUTE WITH ANY Shop,
          YOU HEREBY RELEASE GROCERAPP AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
          SUBSIDIARIES, AFFILIATES, AGENTS AND REPRESENTATIVES FROM ANY AND ALL
          CLAIMS, LIABILITIES, COSTS, INCLUDING WITHOUT LIMITATION
          ATTORNEY&apos;S FEES, LOSS OR DAMAGE OF EVERY KIND AND NATURE, KNOWN
          AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH
          DISPUTES. 10.3. Shop license/ Submissions Service may now or in the
          future permit the submission, sharing or publishing of photographs,
          communications or other content submitted by you and other users
          (&quot;User Submissions&quot;). Other than personally identifiable
          information, which is covered under the GrocerApp Privacy Policy
          available at www.grocerapps.com/privacy, any User Submission
          transmitted or posted to this Software Applications will be considered
          non-confidential. In addition, by submitting any User Submission to
          GrocerApp, you hereby grant GrocerApp a perpetual, worldwide,
          non-exclusive, royalty-free, sub-licenseable and transferable license
          to use, reproduce, distribute, prepare derivative works of, display
          and perform the User Submission in connection with the Services, the
          Support and GrocerApp&apos;s business. We hereby grant each User of
          the Service a non-exclusive license to access their User Submissions
          through Service and to display and publicly perform such User
          Submissions as permitted through the functionality of Service and
          under these Terms and Conditions. In connection with the User
          Submissions, you agree that you will not submit material that: (i) is
          copyrighted, subject to privacy or publicity rights or otherwise
          subject to third party proprietary rights unless you are the owner of
          such rights or have permission from the owner to submit the material
          and to grant GrocerApp all of the license rights granted herein; (ii)
          is unlawful, obscene, harassing, defamatory, libelous, pornographic,
          hateful, racially or ethnically offensive or is otherwise
          inappropriate; (iii) could damage the reputation of GrocerApp or any
          third party; or (iv) impersonates another person. GrocerApp reserves
          the right to remove any User Submissions at its sole discretion and
          without notice or liability to you or to any other person. GrocerApp
          does not endorse any User Submission or any opinion, recommendation or
          advice therein, and GrocerApp expressly disclaims any and all
          liability in connection with any User Submission. You understand and
          agree that you may be exposed to User Submissions that are inaccurate,
          offensive or otherwise objectionable, and you hereby agree to waive
          and hereby do waive any legal or equitable rights or remedies you may
          have against GrocerApp with respect thereto. GrocerApp may provide
          links to Software Applications owned or operated by third parties.
          GrocerApp does not endorse the content or any products or services
          available on such Software Applications and is not responsible for
          such content or its security. Your linking to any other Software
          Applications from this Service is at your own risk. 10.4. Disclaimer
          USE OF THE SUPPORT IS ENTIRELY AT YOUR OWN RISK. CHANGES ARE
          PERIODICALLY MADE TO THE SOFTWARE APPLICATIONS AND MAY BE MADE AT ANY
          TIME WITHOUT NOTICE TO YOU. THE SUPPORT IS PROVIDED ON AN &quot;AS
          IS&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. GROCERAPP MAKES
          NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF
          THE CONTENT PROVIDED THROUGH THE SUPPORT OR THE CONTENT OF ANY
          SOFTWARE APPLICATIONS LINKED TO THE GROCERAPP SOFTWARE APPLICATIONS.
          GROCERAPP ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY (I) ERRORS,
          MISTAKES, OR INACCURACIES OF CONTENT; (II) PERSONAL INJURY OR PROPERTY
          DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND
          USE OF THE GROCERAPP SOFTWARE APPLICATIONS OR THE SUPPORT; (III) ANY
          UNAUTHORIZED ACCESS TO OR USE OF GROCERAPP&apos;s SECURE SERVERS
          AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
          ShopD THEREIN. GROCERAPP DOES NOT WARRANT THAT THE SOFTWARE
          APPLICATIONS WILL OPERATE ERROR-FREE OR THAT THE SOFTWARE APPLICATIONS
          AND ITS SERVER ARE FREE OF COMPUTER VIRUSES AND OTHER HARMFUL GOODS.
          IF YOUR USE OF THE SOFTWARE APPLICATIONS RESULTS IN THE NEED FOR
          SERVICING OR REPLACING EQUIPMENT OR DATA, GROCERAPP SHALL NOT BE
          RESPONSIBLE FOR THOSE COSTS. GROCERAPP, TO THE FULLEST EXTENT
          PERMITTED BY LAW, DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS OR
          IMPLIED, INCLUDING WITHOUT LIMITATION THE WARRANTY OF MERCHANTABILITY,
          NON-INFRINGEMENT OF THIRD PARTY RIGHTS AND THE WARRANTY OF FITNESS FOR
          A PARTICULAR PURPOSE. GROCERAPP MAKES NO WARRANTIES ABOUT THE
          ACCURACY, RELIABILITY, COMPLETENESS OR TIMELINESS OF THE CONTENT,
          SERVICES, SUPPORT, SOFTWARE, TEXT, GRAPHICS OR LINKS. GROCERAPP AND
          ITS AFFILIATES AND LICENSORS CANNOT AND DO NOT GUARANTEE THAT ANY
          PERSONAL INFORMATION SUPPLIED BY YOU WILL NOT BE MISAPPROPRIATED,
          INTERCEPTED, DELETED, DESTROYED OR USED BY OTHERS. 10.5. Limitation of
          Liability YOU AGREE THAT GROCERAPP SHALL NOT BE LIABLE FOR ANY DIRECT,
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES
          ARISING OUT OF OR IN CONNECTION WITH (I) YOUR USE OF THE SUPPORT; (II)
          THE LIABILITY OR FITNESS OF ANY CUSTOMER (III) IN CONNECTION WITH THE
          PERFORMANCE OF OR BROWSING IN THE SOFTWARE APPLICATIONS OR YOUR LINKS
          TO OTHER SOFTWARE APPLICATIONS FROM THIS SOFTWARE APPLICATIONS, EVEN
          IF GROCERAPP HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOU
          FURTHER AGREE THAT GROCERAPP SHALL NOT BE LIABLE FOR ANY DAMAGES
          ARISING FROM INTERRUPTION, SUSPENSION OR TERMINATION OF SERVICES,
          INCLUDING WITHOUT LIMITATION ANY DIRECT, INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, WHETHER SUCH
          INTERRUPTION, SUSPENSION OR TERMINATION WAS JUSTIFIED OR NOT,
          NEGLIGENT OR INTENTIONAL, INADVERTENT OR ADVERTENT. IN NO EVENT SHALL
          GROCERAPP’s TOTAL LIABILITY TO YOU FOR ANY LOSSES ARISING HEREUNDER
          EXCEED THE AMOUNTS PAID BY YOU TO GROCERAPP HEREUNDER. SOME
          JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF WARRANTIES
          OR OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES SO SOME OF THE
          ABOVE LIMITATIONS MAY NOT APPLY TO YOU. SHOULD A JURISDICTION BE
          ADVERSE TO A LIMITATION OR EXCLUSION OF WARRANTIES, SUCH PROVISION
          SHALL BE DEEMED SEVERABLE FROM THIS AGREEMENT AND THE OTHER PROVISIONS
          SHALL REMAIN IN FULL FORCE AND EFFECT. 10.6. Waiver No waiver of any
          rights or remedies by GrocerApp shall be effective unless made in
          writing and signed by an authorised representative of GrocerApp. A
          failure by GrocerApp to exercise or enforce any rights conferred upon
          us by Terms of Service shall not be deemed to be a waiver or variation
          of any such rights or operate so as to bar the exercise or enforcement
          thereof at any subsequent time or times. 10.7. Indemnity You agree to
          defend, indemnify and hold harmless GrocerApp and its officers,
          directors, employees, agents and affiliates (each, an Indemnified
          Party), from and against any losses, claims, actions, costs, damages,
          penalties, fines and expenses, including without limitation
          attorneys&apos; fees and expenses, that may be incurred by an
          Indemnified Party arising out of, relating to or resulting from your
          unauthorized use of the Software Applications or from any breach by
          you of Terms of Service, including without limitation any actual or
          alleged violation of any federal, provincial or local statute,
          ordinance, administrative order, rule or regulation. GrocerApp shall
          provide notice to you promptly of any such claim, suit or proceeding
          and shall have the right to control the defense of such action, at
          your expense, in defending any such claim, suit or proceeding. 10.8.
          Termination At its sole discretion, GrocerApp may modify or
          discontinue Service, or may modify, suspend or terminate your access
          to Service or the Support, for any reason, with or without notice to
          you and without liability to you or any third party. In addition to
          suspending or terminating your access to Service or the Support,
          GrocerApp reserves the right to take appropriate legal action,
          including without limitation pursuing civil, criminal or injunctive
          redress. Even after your right to use the Support is terminated, you
          Account will remain enforceable against you. You may terminate Account
          at any time, however GrocerApp do not guarantee its termination due to
          technical availability. All provisions which by their nature should
          survive to give effect to those provisions shall survive the
          termination of Account. 10.9. Dispute Resolution The parties shall
          first attempt to resolve any dispute related to this Agreement in an
          amicable manner by mediation with a mutually acceptable mediator. If
          unable to agree upon an acceptable mediator, either party may ask a
          mutually agreed upon mediation service to appoint a neutral mediator,
          and the mediation shall be conducted under the Commercial Mediation
          Rules of the mutually acceptable mediation service. Any disputes
          remaining unresolved after mediation shall be settled by binding
          arbitration conducted in Lahore, Pakistan utilizing a mutually agreed
          arbitrator or arbitration service. The arbitration shall be conducted
          under the Commercial Arbitration Rules of the mutually agreed
          arbitrator or arbitration service. Both parties shall be entitled in
          any arbitration to conduct reasonable discovery, including document
          production and a reasonable number of depositions not to exceed five
          per party. The prevailing party shall be entitled to recover its costs
          and reasonable attorney&apos;s fees, as determined by the arbitrator.
          The arbitrator shall be required to follow the law. 10.10. Governing
          Law and Severability This Agreement is governed by the laws of
          Pakistan, The Pakistan courts shall have exclusive jurisdiction and
          venue over any dispute arising out of or relating to this Agreement,
          and each party hereby consents to the jurisdiction and venue of such
          courts. Without regards to its conflict of laws principles. If any
          provision of this Agreement is found to be invalid in any court having
          competent jurisdiction, the invalidity of such provision shall not
          affect the validity of the remaining provisions of this Agreement,
          which shall remain in full force and effect. Any offer for any
          product, feature, service or application made on this Software
          Applications is void where prohibited. 10.11. No Agency No independent
          contractor, agency, partnership, joint venture, employer-employee or
          franchiser-franchisee relationship is intended or created by this
          Agreement. 10.12. Changes to the Agreement GrocerApp reserves the
          right, at its sole and absolute discretion, to change, modify, add to,
          supplement or delete any of the terms and conditions of this
          Agreement, effective with or without prior notice. Your continued use
          of the Software Applications or the Support following any revision to
          this Agreement constitutes your complete and irrevocable acceptance of
          any and all such changes. Contact us If you have any comments or
          questions, please do not hesitate to reach out to us at
          info@grocerapps.com Pakistan - updated September 19th, 2018
        </Typography>
      </Paper>
    );
  }
}

export default withCustomStyles(TermsPage);
