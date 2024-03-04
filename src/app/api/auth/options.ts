import 'server-only';

import { NextAuthOptions, Theme } from 'next-auth';
import EmailProvider, { EmailConfig } from 'next-auth/providers/email';
import { createTransport } from 'nodemailer';

import { db } from '@/app/db';
import { DrizzleAdapter } from '@/app/db/adapter';
import { env } from '../../../../env.mjs';

export const authOptions = {
	providers: [
		EmailProvider({
			sendVerificationRequest: async ({ identifier, url, provider, theme }) => {
				const result = await sendEmail(identifier, provider, url, theme);
				const failed = result.rejected.concat(result.pending).filter(Boolean);
				if (failed.length) {
					throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			if (account?.provider !== 'email' || !user.email) {
				return false;
			}
			const isValidElsysEmail = [
				'2019@elsys-bg.org',
				'2020@elsys-bg.org',
				'2021@elsys-bg.org',
				'2022@elsys-bg.org',
				'2023@elsys-bg.org',
			].some((suffix) => user.email?.endsWith(suffix));
			if (!isValidElsysEmail) {
				return false;
			}
			return true;
		},
	},
	pages: {
		signIn: '/login',
		// signOut: '/signout',
		error: '/login/error',
		verifyRequest: '/confirm-email',
	},

	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'database',
		maxAge: 30 * 24 * 60 * 60 * 4, // 120 days
		updateAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: env.NEXT_AUTH_SECRET,
} satisfies NextAuthOptions;

function html(params: { url: string; identifier: string; theme: Theme }) {
	const { url, identifier, theme } = params;

	const color = {
		background: '#fff',
		text: '#000000',
		mainBackground: '#fbebb7',
		buttonBorder: '#000000',
		buttonText: theme.buttonText || '#fff',
	};

	const buttonStyle = `
    color: ${color.buttonText};
    text-decoration: none;
    border-radius: 5px;
    padding: 18px 36px;
    font-size: 26px;
    display: inline-block;
    font-weight: bold;
    background: #ec626d;
	border: 1px solid ${color.buttonBorder};
  `;

	return `
  <body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; border: 1px solid ${color.buttonBorder}; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Влезте в <strong>TUES Fest 2024</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 10px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px; padding:5px;">
              <a href="${url}" target="_blank" style="${buttonStyle}">
                Влез
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Получавате това писмо, защото някой се опитва да влезе с вашия имейл адрес (${identifier}) в сайта на TUES Fest 2024. Ако не сте били вие, моля пренебрегнете това съобщение. При нужда се свържете с нас като пишете на hacktues@elsys-bg.org
      </td>
    </tr>
  </table>
</body>
`;
}

function text(params: { url: string; identifier: string; theme: Theme }) {
	const { url, identifier } = params;

	return `Влезте в TUES Fest 2024.

За да продължите, моля посетете следния адрес:
${url}

Получавате това писмо, защото някой се опитва да влезе с вашия имейл адрес (${identifier}) в сайта
на TUES Fest 2024. Ако не сте били вие, моля пренебрегнете това съобщение.
При нужда се свържете с нас като пишете на:
hacktues@elsys-bg.org
`;
}

async function sendEmail(identifier: string, provider: EmailConfig, url: string, theme: Theme) {
	const transport = createTransport({
		tls: {
			rejectUnauthorized: false,
		},
		host: 'smtp.eu.mailgun.org',
		secure: true,
		auth: {
			user: 'postmaster@mg.hacktues.bg',
			pass: 'eba5d107d6dea62c0fd754e959e5d6bd-69a6bd85-ad4af96f',
		},
	});

	return await transport.sendMail({
		to: identifier,
		from: {
			name: 'TUES Fest 2024',
			address: 'noreply@hacktues.bg',
		},
		subject: `Влизане в TUES Fest 2024`,
		html: html({ url, identifier, theme }),
		text: text({ url, identifier, theme }),
		references: generateReferences(),
	});
}

function generateReferences() {
	const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	return `<${uniqueId}@elsys-bg.org>`;
}
