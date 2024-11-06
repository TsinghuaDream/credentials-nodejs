import assert from 'assert';
import URICredentialsProvider from '../../src/providers/uri';

describe('URICredentialsProvider', function () {
  it('URICredentialsProvider', async function () {
    let p = URICredentialsProvider.builder().build()
    assert.ok(!(p as any).credentialsURI)

    p = URICredentialsProvider.builder()
      .withCredentialsURI('http:100.1.2.3/profile')
      .build()
    assert.strictEqual((p as any).credentialsURI, 'http:100.1.2.3/profile');

    assert.ok((p as any).needUpdateCredential());
  });

  it('env ALIBABA_CLOUD_CREDENTIALS_URI should ok', async function () {
    process.env.ALIBABA_CLOUD_CREDENTIALS_URI = 'http:100.1.2.3/profile';
    let p = URICredentialsProvider.builder().build();
    assert.strictEqual((p as any).credentialsURI, 'http:100.1.2.3/profile');

    delete process.env.ALIBABA_CLOUD_CREDENTIALS_URI;
  });
});
