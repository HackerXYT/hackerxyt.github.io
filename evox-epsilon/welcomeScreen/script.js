
//bubble.addEventListener("click", function (evt) {
//  evt.preventDefault();
//  bubble.classList.add("animated");
//  setTimeout(function () {
//    bubble.classList.remove("animated");
//  }, 1100);
//});

var startup = new Howl({
	src: ['./sounds/startup.mp3'],
	volume: 1
});

let buttonInner = `<button onclick="begin()">
        <span>Enter Evox!</span>
        <iframe
          src="data:text/html;base64,PGh0bWw+CiAgICAgICAgICAgIDxoZWFkPgogICAgICAgICAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xIj4KICAgICAgICAgICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgICAgICAgICBodG1sLCBib2R5LCBpZnJhbWUsIGNhbnZhc3sKICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwOwogICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwOwogICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDA7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgPC9zdHlsZT4KICAgICAgICAgICAgICAgIDxzY3JpcHQgdHlwZT0ibW9kdWxlIj4KICAgICAgICAgICAgICAgICAgICBpbXBvcnQgUmVhY3QsIHt1c2VSZWZ9IGZyb20gJ2h0dHBzOi8vY2RuLnNreXBhY2suZGV2L3JlYWN0QDE4LjAuMic7CiAgICAgICAgICAgICAgICAgICAgaW1wb3J0IFJlYWN0RE9NIGZyb20gJ2h0dHBzOi8vY2RuLnNreXBhY2suZGV2L3JlYWN0LWRvbUAxOC4wLjInOwogICAgICAgICAgICAgICAgICAgIGltcG9ydCB7Q2FudmFzLCB1c2VGcmFtZX0gZnJvbSAnaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvQHJlYWN0LXRocmVlL2ZpYmVyQDcuMC4yNCc7CgogICAgICAgICAgICAgICAgICAgIGNvbnN0IFRleHR1cmVNZXNoID0gKCkgPT4gewogICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNoID0gdXNlUmVmKG51bGwpCiAgICAgICAgICAgICAgICAgICAgICAgIHVzZUZyYW1lKHN0YXRlID0+IHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2xvY2ssIG1vdXNlLCBnbCwgc2NlbmUsIGNhbWVyYSB9ID0gc3RhdGUKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1lc2guY3VycmVudCl7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfbW91c2UudmFsdWUgPSBbbW91c2UueCwgbW91c2UueV0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNoLmN1cnJlbnQubWF0ZXJpYWwudW5pZm9ybXMudV90aW1lLnZhbHVlID0gY2xvY2suZ2V0RWxhcHNlZFRpbWUoKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICB9KQogICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ21lc2gnLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjptZXNoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBbMCwwLDBdLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbMCwwLDBdCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgncGxhbmVHZW9tZXRyeScse2FyZ3M6WzEwMjQsMTAyNF19KSwgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzaGFkZXJNYXRlcmlhbCcsewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyOiBgLy8gRnJhZ21lbnQgc2hhZGVyCgovLyBVbmlmb3Jtcwp1bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uOwp1bmlmb3JtIHZlYzIgdV9tb3VzZTsKdW5pZm9ybSBmbG9hdCB1X3RpbWU7CnVuaWZvcm0gdmVjMyB1X2NvbG9yOwp1bmlmb3JtIGZsb2F0IHVfc2NhbGU7IAp1bmlmb3JtIGZsb2F0IHVfZGlzdG9ydF9zY2FsZTsKdW5pZm9ybSBmbG9hdCB1X3Bvd2VyOwp1bmlmb3JtIGZsb2F0IHVfc3BlZWQ7CnVuaWZvcm0gZmxvYXQgdV94Owp1bmlmb3JtIGZsb2F0IHVfeTsKdW5pZm9ybSBmbG9hdCB1X2l0ZXJhdGlvbnM7CiAgICAKI2RlZmluZSBwb3dlciAxLgojZGVmaW5lIHpvb21PdXQgMy4KI2RlZmluZSByb3QgMS4KI2RlZmluZSBpdGVyIDUwLgojZGVmaW5lIGh1ZVBvd2VyIDAuNwojZGVmaW5lIGdsb3cgMC41CiNkZWZpbmUgU3BlZWQgMS41CiNkZWZpbmUgV2F2ZVNwZWVkIDIuCiNkZWZpbmUgQnJpZ2h0bmVzcyAwLjUKCnZvaWQgbWFpbigpCnsKICAgIC8vIE5vcm1hbGl6ZWQgcGl4ZWwgY29vcmRpbmF0ZXMgKGZyb20gMCB0byAxKQogICAgdmVjMiB1diA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb24ueHk7CgoJdmVjMiBYWVNjYWxlID0gdmVjMigxLjAtdV9zY2FsZSwxLjAtdV9zY2FsZSk7Cgl2ZWMyIFhZTW92ZSA9IHZlYzIodV94LHVfeSk7CglmbG9hdCBpdGVyYXRpb25zID0gaXRlciAqIHVfaXRlcmF0aW9uczsKCiAgdXYgKj0gem9vbU91dDsKCXV2Lnh5ID0gdXYueHkgKiBYWVNjYWxlOwoJdXYueHkgPSB1di54eSArIFhZTW92ZTsKCXZlYzMgZmluYWxDb2wgPSB2ZWMzKDAsMCwwKTsKCWZsb2F0IGhhbGZEaXN0b3J0ID0gdV9kaXN0b3J0X3NjYWxlIC8gMC41OwoJZmxvYXQgZGlzdG9ydHNjMiA9IHVfZGlzdG9ydF9zY2FsZSAvIHVfZGlzdG9ydF9zY2FsZSArIGhhbGZEaXN0b3J0OwogICAgCglmb3IoZmxvYXQgaSA9IDEuMDsgaSA8IGl0ZXJhdGlvbnM7IGkrKyl7CgkJdXYueCArPSB1X3Bvd2VyIC8gaSAqIHNpbihpICogdV9kaXN0b3J0X3NjYWxlICogdXYueSAtICh1X3RpbWUgKiBTcGVlZCAqIHVfc3BlZWQpKTsKCQl1di55ICs9IHVfcG93ZXIgLyBpICogc2luKGkgKiBkaXN0b3J0c2MyICogdXYueCArICh1X3RpbWUgKiBTcGVlZCAqIHVfc3BlZWQpKTsKCX0KICAgIAoJdmVjMyBjb2wgPSB2ZWMzKHZlYzMoZ2xvdyxnbG93LGdsb3cpL3NpbigodV90aW1lKldhdmVTcGVlZCp1X3NwZWVkKS1sZW5ndGgodXYueXgpIC0gdXYueSkpOwoJZmluYWxDb2wgPSB2ZWMzKGNvbCpjb2wpOwogICAgdmVjMyBDb2xvciA9IHZlYzMoMS4sMS4sMS4pICogQnJpZ2h0bmVzczsKCQogICAgQ29sb3IgPSBDb2xvcipDb2xvciAqIDAuNSArIDAuNSpjb3MoKHVfdGltZSp1X3NwZWVkKSt1di54eXgrdmVjMygwLDIsNCkpICogaHVlUG93ZXI7CgoKICAgIC8vIE91dHB1dCB0byBzY3JlZW4KICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoZmluYWxDb2wucmdiICogQ29sb3IsIDEuMCkgKiBwb3dlcjsKfWAsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4U2hhZGVyOiBgLy8gVmVydGV4IHNoYWRlcgoKdm9pZCBtYWluKCkgewogIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24sIDEuMCk7Cn1gLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaWZvcm1zOiB7InVfY29sb3IiOnsidmFsdWUiOlsxLDAsMF19LCJ1X3NjYWxlIjp7InZhbHVlIjowLjIxfSwidV9kaXN0b3J0X3NjYWxlIjp7InZhbHVlIjowLjUzNX0sInVfcG93ZXIiOnsidmFsdWUiOjAuMTU3fSwidV9zcGVlZCI6eyJ2YWx1ZSI6MC4yMjJ9LCJ1X3giOnsidmFsdWUiOjAuNX0sInVfeSI6eyJ2YWx1ZSI6MC44NTl9LCJ1X2l0ZXJhdGlvbnMiOnsidmFsdWUiOjAuMTIyfSwidV90aW1lIjp7InZhbHVlIjowfSwidV9tb3VzZSI6eyJ2YWx1ZSI6WzAsMF19LCJ1X3Jlc29sdXRpb24iOnsidmFsdWUiOlsxMDI0LDEwMjRdfX0sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lyZWZyYW1lOiBmYWxzZSwgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lyZWZyYW1lTGluZXdpZHRoOiAwLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdGhlcmluZzogZmFsc2UsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFNoYWRpbmc6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG91YmxlU2lkZWQ6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xzbFZlcnNpb246ICIxMDAiCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KQogICAgICAgICAgICAgICAgICAgICAgICApOyAgCiAgICAgICAgICAgICAgICAgICAgfQoKICAgICAgICAgICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDYW52YXMsewogICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2w6IHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlbXVsdGlwbGllZEFscGhhOiBmYWxzZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnRpYWxpYXM6IHRydWUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlY2lzaW9uOiAiaGlnaHAiLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvd2VyUHJlZmVyZW5jZTogImhpZ2gtcGVyZm9ybWFuY2UiCiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICAgICAgICAgICAgICAgZHByOiBbMiwyXSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVyYTogewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdjogNzUsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcjogMC4xLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhcjogMTAwMCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogWzAsMCw1XQogICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOnsgaGVpZ2h0OiA1MTIsIHdpZHRoOiA1MTIgfQogICAgICAgICAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHR1cmVNZXNoKSAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICksIGRvY3VtZW50LmJvZHkpOwogICAgICAgICAgICAgICAgPC9zY3JpcHQ+CiAgICAgICAgICAgIDwvaGVhZD4KICAgICAgICAgICAgPGJvZHk+CjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9seWdpYS5mNzQ5MDU5NC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvYWRkLmE1NTI0MGRkLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9ib29rLjVmYjExYjhkLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9jb2RlLjQyOGIxOGY1LnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9vdmVyZmxvdy44ZDUwNDE1ZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvY2xvc2UuNjRiODBkMDAuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL3RyYXNoLjUyNGRiY2QzLnN2ZyAtLT4KPC9ib2R5PgogICAgICAgIDwvaHRtbD4="
          style="border:0;margin:0;width: 512px;height:512px;"/>
      </button>`

      let shaderInner = `<shader-art autoplay role="img" aria-label="An animated gradient that looks like a laser beam, using the trans pride colors. The beam does not run in a straight line, but in curves.">
      <script type="buffer" name="position" data-size="2">
        [-1, 1, -1,-1, 1,1, 1, 1, -1,-1, 1,-1]
      </script>
      <script type="buffer" name="uv" data-size="2">
        [ 0, 0,  0, 1, 1,0, 1, 0,  0, 1, 1, 1]
      </script>
      <script type="vert">
        precision highp float;
        attribute vec4 position;
        attribute vec2 uv;
        varying vec2 vUv;
        varying vec4 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = position;
        }
      </script>
      <script type="frag">
        precision highp float;
        varying vec2 vUv;
        varying vec4 vPos;
        uniform vec2 resolution;
        uniform float time;
        #define SPEED 1.2
        #define CYAN vec3(0,1.,1.)
        #define RED vec3(1.,0,0)
        #define GREEN vec3(0,1.,0)
        #define BLUE vec3(0,0, 1.)
        
        float f(float x) {
          return sin(x + time * SPEED) * .2;
        }
        
        float ff(float x) {
          return f(x) * .5 + f(x*2.) * .2 + f(x*5.) * .3;
        }
        
        vec3 draw(vec2 p, float thickness, vec3 color, float amp) {
          float r = 1. - smoothstep(abs(p.y-ff(p.x) * amp), 0., thickness);
          vec3 c = r * color;
          return c;
        }
        
        void main() {
          vec2 p0 = vec2(vUv.x * 2. - 1., 1. - vUv.y * 2. );
          vec2 p = vec2(p0.x * resolution.x / resolution.y, p0.y);
          vec2 p1 = vec2(1., 0.) + p;
          vec2 p2 = vec2(2., 0.) + p;
          vec2 p3 = vec2(3., 0.) + p;
          
          vec3 c = vec3(0);
          for (int i = 0; i < 3; i++) {
            float lum = .5 - float(i)*.1;
            float amp = 0.5 + float(i) * .6;
            float thick = 0.02 + 0.05 * float(i);
            c+= draw(p + vec2(float(i), 0), thick, BLUE, amp) * lum;
            c+= draw(p1+ vec2(float(i), 0), thick, CYAN, amp) * lum;
            c+= draw(p2+ vec2(float(i), 0), thick, RED, amp) * lum;
            c+= draw(p3+ vec2(float(i), 0), thick, CYAN, amp) * lum;
            
          }
          
          c= clamp(c* vec3(2., .5, 2.), 0., 1.);
          gl_FragColor = vec4(c,1.);
        }
      </script>
    </shader-art>`
$(document).ready(function() {
  document.getElementById("interactions").innerHTML = buttonInner
  document.getElementById("shader").innerHTML = shaderInner
  console.log("Loaded!")
  setTimeout(function() {
    $("#info").fadeIn("slow",function() {
      setTimeout(function() {
        $("#info").fadeOut("slow",function() {
          $("#bubble").fadeOut("slow", function() {
            document.getElementById("bubble").classList.remove("bubble_off")
            document.getElementById("bubble").classList.add("bubble")
            $("#bubble").fadeIn("slow", function() {
              document.getElementById("text").innerHTML = `<h3>Let's customize your experience.</h3>`
              document.getElementById("bubble").style.animation = "floating 2.5s ease-in-out infinite"
              $("#info").fadeIn("slow",function() {
                $("#interactions").fadeIn("slow")
              })
            })
          })
          
         
        })
      }, 800)
    })
  }, 800)
  
})
let beggined = false
function begin() {
  if(!beggined) {
    beggined = true
    console.log("Started")
    setTimeout(function() {
      $("#loading").fadeIn("slow", function() {
        $("#bubble").fadeOut("slow", function() {
          $("#info").fadeOut("slow")
          
          setTimeout(function() {
            $("#above").fadeOut(5000)
            //document.getElementById("above").opacity = "0"
            //$("#shader").fadeIn("slow")
            startup.play()
          }, 700)
          //
          //document.getElementById("shader").style.display = "block"
          //document.getElementById("shader").style.opacity = "1"
          //$("#shader").fadeIn("2000")
          
        })
      })
      
    }, 500)
  }
 
}